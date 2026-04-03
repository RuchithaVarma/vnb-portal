import crypto from 'crypto';
import { NextRequest } from 'next/server';

/**
 * Payment Security Utilities
 * Implements additional security measures for payment processing
 */

// Rate limiting storage (In production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting middleware for payment endpoints
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // New window or expired
    const newRecord = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, newRecord);
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime: newRecord.resetTime,
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Validate payment amount to prevent tampering
 */
export function validatePaymentAmount(
  amount: number,
  expectedAmount?: number,
  minAmount: number = 100,
  maxAmount: number = 1000000
): { valid: boolean; error?: string } {
  // Check if amount is a positive number
  if (!amount || amount <= 0) {
    return { valid: false, error: "Invalid amount" };
  }

  // Check minimum amount
  if (amount < minAmount) {
    return { valid: false, error: `Amount must be at least ₹${minAmount}` };
  }

  // Check maximum amount
  if (amount > maxAmount) {
    return { valid: false, error: `Amount exceeds maximum limit of ₹${maxAmount}` };
  }

  // Check against expected amount (if provided)
  if (expectedAmount && amount !== expectedAmount) {
    return { valid: false, error: "Amount mismatch" };
  }

  // Check for suspicious patterns
  const amountStr = amount.toString();
  if (amountStr.includes('666') || amountStr.includes('999999')) {
    console.warn(`Suspicious amount pattern detected: ${amount}`);
  }

  return { valid: true };
}

/**
 * Generate secure payment reference
 */
export function generateSecureReference(prefix: string = 'PAY'): string {
  const timestamp = Date.now().toString(36);
  const randomBytes = crypto.randomBytes(4).toString('hex').toUpperCase();
  const checksum = crypto
    .createHash('sha256')
    .update(`${prefix}-${timestamp}-${randomBytes}`)
    .digest('hex')
    .substring(0, 4)
    .toUpperCase();
  
  return `${prefix}${timestamp}${randomBytes}${checksum}`;
}

/**
 * Validate payment link access
 */
export function validatePaymentLinkAccess(
  linkId: string,
  userAgent?: string,
  ip?: string
): { valid: boolean; error?: string; riskScore: number } {
  let riskScore = 0;

  // Validate link ID format
  if (!/^pl_[a-zA-Z0-9]{9,}$/.test(linkId)) {
    return { valid: false, error: "Invalid link format", riskScore: 100 };
  }

  // Check for suspicious user agents
  if (userAgent) {
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /scraper/i,
      /curl/i,
      /wget/i,
    ];
    
    if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
      riskScore += 50;
    }
  }

  // Rate limit check per IP
  if (ip) {
    const rateLimit = checkRateLimit(`payment-link-${ip}`, 3, 300000); // 3 attempts per 5 minutes
    if (!rateLimit.allowed) {
      return { valid: false, error: "Too many attempts", riskScore: 100 };
    }
  }

  // Additional checks can be added here
  // - Geolocation validation
  // - Device fingerprinting
  // - Behavioral analysis

  return { 
    valid: riskScore < 80, 
    riskScore,
    error: riskScore >= 80 ? "High risk detected" : undefined 
  };
}

/**
 encrypt sensitive data
 */
export function encryptSensitiveData(data: string, key: string): string {
  const algorithm = 'aes-256-gcm';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, key);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
}

/**
 * Decrypt sensitive data
 */
export function decryptSensitiveData(encryptedData: string, key: string): string {
  const algorithm = 'aes-256-gcm';
  const parts = encryptedData.split(':');
  
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format');
  }
  
  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encrypted = parts[2];
  
  const decipher = crypto.createDecipher(algorithm, key);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

/**
 * Validate webhook signature with enhanced security
 */
export function validateWebhookSignatureEnhanced(
  payload: string,
  signature: string,
  secret: string,
  timestamp?: string
): { valid: boolean; error?: string } {
  // Check timestamp to prevent replay attacks
  if (timestamp) {
    const now = Math.floor(Date.now() / 1000);
    const webhookTime = parseInt(timestamp);
    
    // Reject webhooks older than 5 minutes
    if (now - webhookTime > 300) {
      return { valid: false, error: "Webhook timestamp too old" };
    }
    
    // Reject webhooks from the future (with 5 minute tolerance)
    if (webhookTime - now > 300) {
      return { valid: false, error: "Webhook timestamp from future" };
    }
  }

  // Validate signature format
  if (!signature || !signature.startsWith('sha256=')) {
    return { valid: false, error: "Invalid signature format" };
  }

  // Compute expected signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  const receivedSignature = signature.substring(7); // Remove 'sha256=' prefix

  // Constant-time comparison to prevent timing attacks
  const isValid = crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(receivedSignature, 'hex')
  );

  if (!isValid) {
    console.error('Webhook signature mismatch:', {
      expected: expectedSignature.substring(0, 8) + '...',
      received: receivedSignature.substring(0, 8) + '...',
    });
    return { valid: false, error: "Invalid signature" };
  }

  return { valid: true };
}

/**
 * Sanitize payment metadata
 */
export function sanitizePaymentMetadata(metadata: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  const allowedKeys = [
    'courseId',
    'grade',
    'paymentMethod',
    'cardLast4',
    'upiId',
    'bank',
    'source',
    'campaign',
    'referrer',
  ];

  const maxStringLength = 255;
  const prohibitedPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
  ];

  for (const [key, value] of Object.entries(metadata)) {
    // Only allow whitelisted keys
    if (!allowedKeys.includes(key)) {
      console.warn(`Blocked metadata key: ${key}`);
      continue;
    }

    // Sanitize string values
    if (typeof value === 'string') {
      // Check for prohibited patterns
      if (prohibitedPatterns.some(pattern => pattern.test(value))) {
        console.warn(`Blocked malicious content in ${key}`);
        continue;
      }

      // Truncate long strings
      if (value.length > maxStringLength) {
        sanitized[key] = value.substring(0, maxStringLength);
      } else {
        sanitized[key] = value;
      }
    } else if (typeof value === 'number' && value >= 0) {
      sanitized[key] = value;
    } else if (typeof value === 'boolean') {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Generate CSRF token for payment forms
 */
export function generateCSRFToken(sessionId: string): string {
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(16).toString('hex');
  
  const token = crypto
    .createHmac('sha256', process.env.CSRF_SECRET || 'default-secret')
    .update(`${sessionId}-${timestamp}-${random}`)
    .digest('hex');
  
  return `${token}.${timestamp}`;
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(
  token: string,
  sessionId: string,
  maxAge: number = 3600000 // 1 hour
): boolean {
  if (!token || !sessionId) return false;

  const [hash, timestamp] = token.split('.');
  
  if (!hash || !timestamp) return false;

  // Check token age
  const now = Date.now();
  const tokenTime = parseInt(timestamp);
  
  if (now - tokenTime > maxAge) {
    return false;
  }

  // Recreate and verify
  const expectedHash = crypto
    .createHmac('sha256', process.env.CSRF_SECRET || 'default-secret')
    .update(`${sessionId}-${timestamp}`)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(hash, 'hex'),
    Buffer.from(expectedHash, 'hex')
  );
}

/**
 * Security headers for payment endpoints
 */
export const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.razorpay.com",
};

/**
 * IP whitelist for admin payment operations
 */
export const adminIPWhitelist = [
  // Add your office IPs here
  // '192.168.1.100',
  // '203.0.113.0/24',
];

/**
 * Check if IP is whitelisted
 */
export function isIPWhitelisted(ip: string): boolean {
  if (adminIPWhitelist.length === 0) return true; // No whitelist configured
  
  // Simple IP check (implement CIDR support if needed)
  return adminIPWhitelist.includes(ip);
}
