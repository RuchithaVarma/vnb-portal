"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TestAuth() {
  const { user, signup, login, isAuthenticated } = useAuth();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Test signup with sample data
  const testSignup = async () => {
    setIsLoading(true);
    addResult("🧪 Testing signup with sample data...");
    
    const testData = {
      name: "Test User " + Date.now(),
      email: `test${Date.now()}@brilliantroots.com`,
      phone: "9876543210",
      password: "password123",
      grade: "10"
    };

    try {
      const result = await signup(testData);
      
      if (result.success) {
        addResult(`✅ Signup successful for ${testData.email}`);
        
        // Verify data was stored in Firestore
        setTimeout(async () => {
          if (user?.id) {
            const docRef = doc(db, "users", user.id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              const data = docSnap.data();
              addResult("✅ User data found in Firestore");
              addResult(`   Name: ${data.name}`);
              addResult(`   Email: ${data.email}`);
              addResult(`   Application ID: ${data.applicationId}`);
              addResult(`   Role: ${data.role}`);
              addResult(`   Username: ${data.username}`);
              addResult(`   Created: ${data.createdAt}`);
            } else {
              addResult("❌ User data NOT found in Firestore");
            }
          }
        }, 2000);
      } else {
        addResult(`❌ Signup failed: ${result.error}`);
      }
    } catch (error: any) {
      addResult(`❌ Signup error: ${error.message}`);
    }
    
    setIsLoading(false);
  };

  // Test login
  const testLogin = async () => {
    setIsLoading(true);
    addResult("🧪 Testing login...");
    
    try {
      const result = await login({
        email: "test@brilliantroots.com",
        password: "password123"
      });
      
      if (result) {
        addResult("✅ Login successful");
        addResult(`   User: ${user?.name}`);
        addResult(`   Email: ${user?.email}`);
        addResult(`   Role: ${user?.role}`);
      } else {
        addResult("❌ Login failed");
      }
    } catch (error: any) {
      addResult(`❌ Login error: ${error.message}`);
    }
    
    setIsLoading(false);
  };

  // Check all users in Firestore
  const checkAllUsers = async () => {
    setIsLoading(true);
    addResult("🔍 Checking all users in Firestore...");
    
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      addResult(`Found ${querySnapshot.docs.length} users in collection:`);
      
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        addResult(`   - ${data.name} (${data.email}) - Role: ${data.role || 'N/A'} - ID: ${data.applicationId || 'N/A'}`);
      });
    } catch (error: any) {
      addResult(`❌ Error fetching users: ${error.message}`);
    }
    
    setIsLoading(false);
  };

  // Clear results
  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Test Panel</h1>
        
        {/* Current Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="space-y-2">
            <p><strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}</p>
            {user && (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Application ID:</strong> {user.applicationId}</p>
                <p><strong>Username:</strong> {user.username}</p>
              </>
            )}
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Functions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={testSignup}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Test Signup
            </button>
            <button
              onClick={testLogin}
              disabled={isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              Test Login
            </button>
            <button
              onClick={checkAllUsers}
              disabled={isLoading}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              Check All Users
            </button>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear Results
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="bg-gray-100 rounded p-4 h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500">No tests run yet. Click a test button above.</p>
            ) : (
              <pre className="text-sm whitespace-pre-wrap">{testResults.join('\n')}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
