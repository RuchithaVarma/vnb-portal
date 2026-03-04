import React from 'react';

export default function PrimaryCourses() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Primary Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Primary Course {item}</h2>
              <p className="text-gray-600">Course description for primary level students.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
