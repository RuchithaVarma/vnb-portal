# Admin Setup Instructions

## Quick Setup Guide

### Step 1: Enable Email Authentication in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **bloomsraw-e2af6**
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Email/Password**
5. Enable the toggle and click **Save**

### Step 2: Create Admin User

1. In Firebase Console, go to **Authentication** → **Users**
2. Click **Add user** button
3. Enter the following details:
   - **Email**: `rawpowders@gmail.com`
   - **Password**: `welcome`
4. Click **Add user**
5. **Copy the User UID** that appears in the users list

### Step 3: Set Admin Role in Firestore

1. In Firebase Console, go to **Firestore Database**
2. Click on the **users** collection (create it if it doesn't exist)
3. Click **Add document**
4. For Document ID, paste the **User UID** you copied in Step 2
5. Add the following fields:
   - **email** (string): `rawpowders@gmail.com`
   - **role** (string): `admin`
   - **createdAt** (string): Current timestamp (e.g., `2026-02-06T05:30:00.000Z`)
   - **updatedAt** (string): Same as createdAt
6. Click **Save**

### Step 4: Test Login

1. Start your development server: `npm run dev`
2. Navigate to: `http://localhost:3000/login`
3. Login with:
   - **Email**: `rawpowders@gmail.com`
   - **Password**: `welcome`
4. You should be redirected to the admin dashboard at `/admin`

## Alternative: Automated Setup (if email auth is already enabled)

If you've already enabled Email/Password authentication in Firebase Console, you can use the automated script:

```bash
node scripts/create-admin-user.mjs
```

This will create both the Firebase Auth user and the Firestore admin role document.

## Troubleshooting

### "Access Denied" after login
- Verify the user document exists in Firestore `users` collection
- Verify the document ID matches the Firebase Auth UID
- Verify the `role` field is set to `'admin'` (string)

### "Invalid credentials" error
- Verify Email/Password authentication is enabled in Firebase Console
- Verify the user exists in Firebase Authentication
- Check that the password is correct

### Can't see admin sidebar
- Clear browser cache and cookies
- Check browser console for errors
- Verify you're logged in with the admin account
