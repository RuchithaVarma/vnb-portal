"use client";

import { useState } from "react";
import {
  Link,
  Copy,
  Mail,
  MessageSquare,
  QrCode,
  CheckCircle,
  Calendar,
  DollarSign,
  User,
  Clock,
  Share2,
  Download,
  RefreshCw,
} from "lucide-react";

interface PaymentLinkData {
  id: string;
  courseId: string;
  courseName: string;
  amount: number;
  currency: string;
  expiryDate?: string;
  maxUses?: number;
  currentUses: number;
  isActive: boolean;
  createdAt: string;
  customMessage?: string;
}

interface PaymentLinkGeneratorProps {
  courseId: string;
  courseName: string;
  amount: number;
  onCreateLink?: (linkData: PaymentLinkData) => void;
}

export default function PaymentLinkGenerator({
  courseId,
  courseName,
  amount,
  onCreateLink,
}: PaymentLinkGeneratorProps) {
  const [linkData, setLinkData] = useState<PaymentLinkData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [expiryHours, setExpiryHours] = useState(24);
  const [maxUses, setMaxUses] = useState(1);

  // Generate payment link
  const generatePaymentLink = async () => {
    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      const newLink: PaymentLinkData = {
        id: "pl_" + Math.random().toString(36).substr(2, 9),
        courseId,
        courseName,
        amount,
        currency: "INR",
        expiryDate: new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString(),
        maxUses,
        currentUses: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        customMessage,
      };

      setLinkData(newLink);
      setIsCreating(false);
      onCreateLink?.(newLink);
    }, 1500);
  };

  // Copy link to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Get payment URL
  const getPaymentUrl = () => {
    if (!linkData) return "";
    const baseUrl = window.location.origin;
    return `${baseUrl}/pay/${linkData.id}`;
  };

  // Share via email
  const shareViaEmail = () => {
    if (!linkData || !email) return;
    
    const subject = `Payment Link for ${courseName}`;
    const body = `
Dear Student,

Please click on the link below to complete your payment for ${courseName}:

Payment Link: ${getPaymentUrl()}

Amount: ₹${amount.toLocaleString()}
Valid Until: ${new Date(linkData.expiryDate!).toLocaleDateString()}

${customMessage ? `Message: ${customMessage}` : ""}

If you have any questions, please contact our support team.

Best regards,
Brilliant Roots Academy
    `;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Share via WhatsApp
  const shareViaWhatsApp = () => {
    if (!linkData) return;
    
    const message = `Payment link for ${courseName}: ${getPaymentUrl()}\n\nAmount: ₹${amount.toLocaleString()}\nValid until: ${new Date(linkData.expiryDate!).toLocaleDateString()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Download QR Code (placeholder)
  const downloadQRCode = () => {
    alert("QR Code download feature would be implemented here");
  };

  // Regenerate link
  const regenerateLink = () => {
    setLinkData(null);
    generatePaymentLink();
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Link className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Payment Link Generator</h2>
            <p className="text-sm text-gray-500">Create secure payment links for quick enrollment</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {!linkData ? (
          <>
            {/* Course Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course:</span>
                  <span className="font-medium">{courseName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-lg">₹{amount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Link Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold">Link Settings</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Link Validity</label>
                <select
                  value={expiryHours}
                  onChange={(e) => setExpiryHours(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>1 Hour</option>
                  <option value={6}>6 Hours</option>
                  <option value={24}>24 Hours</option>
                  <option value={72}>3 Days</option>
                  <option value={168}>7 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Uses</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={maxUses}
                  onChange={(e) => setMaxUses(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Number of times the link can be used</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Custom Message (Optional)</label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Add a custom message for the student..."
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePaymentLink}
              disabled={isCreating}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Link...
                </>
              ) : (
                <>
                  <Link className="w-4 h-4" />
                  Generate Payment Link
                </>
              )}
            </button>
          </>
        ) : (
          <>
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Payment Link Generated Successfully!</span>
              </div>
            </div>

            {/* Link Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Payment Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={getPaymentUrl()}
                    readOnly
                    className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 font-mono text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(getPaymentUrl())}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Link Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Valid Until</span>
                  </div>
                  <p className="font-semibold text-sm">{formatDate(linkData.expiryDate!)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Usage</span>
                  </div>
                  <p className="font-semibold text-sm">
                    {linkData.currentUses} / {linkData.maxUses} uses
                  </p>
                </div>
              </div>

              {/* Share Options */}
              <div>
                <h3 className="font-semibold mb-3">Share Link</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={shareViaWhatsApp}
                    className="flex items-center justify-center gap-2 py-2 px-4 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Share via WhatsApp
                  </button>
                  <button
                    onClick={() => setEmail("")}
                    className="flex items-center justify-center gap-2 py-2 px-4 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Share via Email
                  </button>
                </div>
              </div>

              {/* Email Input */}
              {email !== null && (
                <div className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={shareViaEmail}
                    disabled={!email}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    Send Email
                  </button>
                </div>
              )}

              {/* Additional Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={downloadQRCode}
                  className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  Download QR
                </button>
                <button
                  onClick={regenerateLink}
                  className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Security Note */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Lock className="w-3 h-3" />
          <span>Payment links are secure and can only be used for the specified course and amount</span>
        </div>
      </div>
    </div>
  );
}

// Add Lock import
import { Lock } from "lucide-react";
