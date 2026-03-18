# Application Form Implementation

## Overview
A comprehensive 5-step application form that captures all student details and stores them in the Firestore `users` collection during authentication.

## Features Implemented

### 1. Multi-Step Application Form (`/application`)
- **Step 1**: Personal Information
  - Name, Email, Phone, Password, Grade
  - Password confirmation with validation
  
- **Step 2**: Course Selection
  - Course selection with fee display
  - Preferred timing options
  
- **Step 3**: Parent/Guardian Information
  - Parent name, phone, email
  - Parent occupation
  
- **Step 4**: Address Information
  - Complete address details
  - Previous school information
  - How they heard about us
  - Reason for joining
  
- **Step 5**: Payment Information
  - Payment method selection
  - Fee display based on selected course
  - Terms and conditions agreement

### 2. Data Storage Structure
All application data is stored in the Firestore `users` collection with the following structure:

```javascript
{
  // Basic Authentication Info
  name: string,
  email: string,
  phone: string,
  grade: string,
  password: string, // Only during signup, handled by Firebase Auth
  
  // System Generated Fields
  id: string, // Firebase UID
  uid: string, // Firebase UID
  role: "student",
  applicationId: string, // e.g., "BR123ABC"
  username: string, // Generated from email
  
  // Course Information
  course: string,
  preferredTiming: string,
  
  // Parent Information
  parentName: string,
  parentPhone: string,
  parentEmail: string,
  parentOccupation: string,
  
  // Address Information
  address: string,
  city: string,
  state: string,
  postalCode: string,
  
  // Additional Information
  previousSchool: string,
  reasonForJoining: string,
  howDidYouHear: string,
  
  // Payment Information
  paymentMethod: string,
  paymentStatus: "pending",
  paymentAmount: number,
  paymentDate: null,
  
  // Application Status
  applicationStatus: "submitted",
  applicationDate: string, // ISO timestamp
  
  // Metadata
  createdAt: string,
  updatedAt: string
}
```

### 3. Authentication Integration
- User account created in Firebase Auth during application submission
- All form data stored in Firestore `users` collection
- User automatically logged in after successful application
- Redirected to success page then dashboard

### 4. Success Page (`/application-success`)
- Displays application confirmation
- Shows submitted details
- Auto-redirects to dashboard after 10 seconds
- Provides next steps information

## Updated Components

### 1. AuthContext (`/src/context/AuthContext.tsx`)
- Extended User interface to include all application fields
- Updated signup function to handle complete application data
- Enhanced mapFirestoreUserDoc to map all fields correctly

### 2. Header Component (`/src/components/Header.tsx`)
- Added "Apply Now" link in navigation
- Maintains hydration-safe implementation

## Course Fees Structure
```javascript
const fees = {
  "mathematics": 5000,
  "science": 6000,
  "english": 4000,
  "vedic-maths": 3000,
  "phonics": 2500,
  "abacus": 3500,
  "jee": 10000,
  "neet": 12000,
  "coding": 4500,
  "telugu": 3000
};
```

## Form Validation
Each step has specific validation:
- Step 1: All personal fields required, email format, phone 10 digits, password min 6 chars
- Step 2: Course and timing selection required
- Step 3: Parent name and phone required, parent email format if provided
- Step 4: Address fields required
- Step 5: Payment method and terms agreement required

## Navigation Flow
1. User clicks "Apply Now" in header
2. Fills out 5-step application form
3. Submits application → Creates Firebase Auth user
4. Stores all data in Firestore users collection
5. Redirects to success page
6. Auto-redirects to dashboard

## Testing the Application Form

### Method 1: Through the UI
1. Run `npm run dev`
2. Navigate to `/application`
3. Fill out all 5 steps
4. Submit the form
5. Check `/test-auth` to verify data storage

### Method 2: Using Test Tools
1. Visit `/test-auth` page
2. Use "Test Signup" to verify data structure
3. Check "Check All Users" to see stored data

## Future Enhancements
1. Payment gateway integration
2. Document upload functionality
3. Email/SMS notifications
4. Application status tracking
5. Counselor assignment system

## Security Considerations
- Password handled by Firebase Auth (not stored in plain text)
- All data stored in Firestore with proper security rules
- Input validation on both client and server side
- Protected routes for authenticated users

## Troubleshooting
- If data not storing: Check Firestore security rules
- If auth fails: Verify Firebase configuration
- If hydration errors: Ensure ClientOnly wrapper usage
- Check browser console for detailed error messages
