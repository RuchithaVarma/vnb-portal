'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminSeedPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const createDefaultAdmin = async () => {
    setStatus('loading');
    try {
      // 1. Create Auth User
      // Using a predefined dummy credential as requested
      const email = 'admin@blooms.com';
      const password = 'bloomsenergy'; // Requested password

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Create Admin Role in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'admin',
        createdAt: new Date().toISOString()
      });

      setStatus('success');
      setMessage(`Admin created successfully! \nEmail: ${email} \nPassword: ${password}`);
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      if (error.code === 'auth/email-already-in-use') {
        setMessage('Error: The user "admin@blooms.com" already exists. You can just login.');
      } else if (error.code === 'auth/configuration-not-found') {
        setMessage('Error: "Email/Password" sign-in is disabled in your Firebase Console.\n\nGo to Firebase Console > Authentication > Sign-in method > Enable Email/Password.');
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-cream-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-card border border-forest/10 text-center">
        <h1 className="text-2xl font-bold text-forest mb-4">Setup Default Admin</h1>
        <p className="text-gray-600 mb-6">
          Click below to create the default admin account.<br/>
          <strong>Warning:</strong> Only do this once.
        </p>

        {status === 'idle' && (
          <button 
            onClick={createDefaultAdmin}
            className="btn-primary w-full py-3"
          >
            Create Admin (admin@blooms.com)
          </button>
        )}

        {status === 'loading' && (
          <div className="text-forest font-medium animate-pulse">Creating account...</div>
        )}

        {status === 'success' && (
          <div className="bg-green-50 text-green-800 p-4 rounded-lg text-left">
            <h3 className="font-bold mb-2">Success!</h3>
            <p className="whitespace-pre-wrap font-mono text-sm">{message}</p>
            <a href="/login" className="block mt-4 text-center btn-primary py-2 text-sm">
              Go to Login
            </a>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg">
            <p>{message}</p>
            <button 
                onClick={() => setStatus('idle')}
                className="mt-2 text-sm underline hover:text-red-900"
            >
                Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
