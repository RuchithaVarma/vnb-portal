"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TestApplication() {
  const { signup } = useAuth();
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Test application submission with all fields
  const testApplicationSubmission = async () => {
    setIsLoading(true);
    addResult("🧪 Testing full application submission...");
    
    const testData = {
      // Basic authentication info
      name: "Test Application User",
      email: `testapp${Date.now()}@brilliantroots.com`,
      phone: "9876543210",
      password: "password123",
      grade: "10",
      
      // Course information
      course: "mathematics",
      preferredTiming: "evening",
      
      // Parent information
      parentName: "Test Parent",
      parentPhone: "9876543211",
      parentEmail: "parent@test.com",
      parentOccupation: "Engineer",
      
      // Address information
      address: "123 Test Street, Test Area",
      city: "Test City",
      state: "Test State",
      postalCode: "123456",
      
      // Additional information
      previousSchool: "Test Previous School",
      reasonForJoining: "To improve my studies",
      howDidYouHear: "google",
      
      // Payment information
      paymentMethod: "online",
      paymentStatus: "pending",
      paymentAmount: 5000,
      paymentDate: null,
      
      // Application status
      applicationStatus: "submitted",
      applicationDate: new Date().toISOString(),
    };

    try {
      addResult("Submitting application data...");
      const result = await signup(testData);
      
      if (result.success) {
        addResult("✅ Application submitted successfully!");
        
        // Verify data was stored
        setTimeout(async () => {
          await verifyStoredData(testData.email);
        }, 2000);
      } else {
        addResult(`❌ Application failed: ${result.error}`);
      }
    } catch (error: any) {
      addResult(`❌ Error: ${error.message}`);
    }
    
    setIsLoading(false);
  };

  // Verify data in Firestore
  const verifyStoredData = async (email: string) => {
    addResult("🔍 Verifying stored data in Firestore...");
    
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);
      
      let foundUser = null;
      snapshot.docs.forEach(doc => {
        if (doc.data().email === email) {
          foundUser = { id: doc.id, ...doc.data() };
        }
      });
      
      if (foundUser) {
        addResult("✅ User found in Firestore!");
        addResult(`   Name: ${foundUser.name}`);
        addResult(`   Email: ${foundUser.email}`);
        addResult(`   Course: ${foundUser.course}`);
        addResult(`   Parent: ${foundUser.parentName}`);
        addResult(`   Address: ${foundUser.address}`);
        addResult(`   Payment Method: ${foundUser.paymentMethod}`);
        addResult(`   Application ID: ${foundUser.applicationId}`);
        addResult(`   Total fields stored: ${Object.keys(foundUser).length}`);
      } else {
        addResult("❌ User not found in Firestore");
      }
    } catch (error: any) {
      addResult(`❌ Error verifying data: ${error.message}`);
    }
  };

  // Check all users
  const checkAllUsers = async () => {
    setIsLoading(true);
    addResult("🔍 Checking all users in Firestore...");
    
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      addResult(`Found ${querySnapshot.docs.length} users in collection:`);
      
      querySnapshot.docs.forEach((doc, index) => {
        const data = doc.data();
        addResult(`\nUser ${index + 1}:`);
        addResult(`  Email: ${data.email || 'N/A'}`);
        addResult(`  Name: ${data.name || 'N/A'}`);
        addResult(`  Course: ${data.course || 'N/A'}`);
        addResult(`  Parent: ${data.parentName || 'N/A'}`);
        addResult(`  Address: ${data.address || 'N/A'}`);
        addResult(`  Payment: ${data.paymentMethod || 'N/A'}`);
        addResult(`  Fields: ${Object.keys(data).length}`);
      });
    } catch (error: any) {
      addResult(`❌ Error: ${error.message}`);
    }
    
    setIsLoading(false);
  };

  // Clear results
  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Application Form Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Functions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={testApplicationSubmission}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Test Application Submission
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

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="bg-gray-100 rounded p-4 h-96 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-gray-500">No tests run yet. Click a test button above.</p>
            ) : (
              <pre className="text-sm whitespace-pre-wrap">{results.join('\n')}</pre>
            )}
          </div>
        </div>
        
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside text-sm text-yellow-800 space-y-1">
            <li>Click "Test Application Submission" to test with sample data</li>
            <li>Check the browser console for detailed logs</li>
            <li>Use "Check All Users" to see all stored users</li>
            <li>Verify all fields are stored correctly</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
