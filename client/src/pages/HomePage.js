import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* --- Main Welcome Section --- */}
      <div className="container mx-auto p-4 md:p-8 pt-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Welcome to Gahmar (गहमर)
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Asia's Largest Village | Ghazipur, Uttar Pradesh
        </p>
      </div>

      {/* --- Information Cards Section --- */}
      <div className="container mx-auto px-4 md:px-8 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">About the Village</h2>
          <p className="text-gray-600">
            Gahmar is renowned for its significant population and rich history,
            with a strong tradition of its residents serving in the Indian Army.
            Every household has a connection to the armed forces.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Key Statistics</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>District:</strong> Ghazipur</li>
            <li><strong>State:</strong> Uttar Pradesh</li>
            <li><strong>Population:</strong> Approx. 1,25,000</li>
            <li><strong>Established:</strong> 1530 AD</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Important Contacts</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Sarpanch:</strong> Smt. Balika Devi</li>
            <li><strong>Secretary:</strong> Shri. Ram Kumar</li>
            <li><strong>Local Police Station:</strong> 112</li>
          </ul>
        </div>
      </div>

      {/* --- NEW: Photo Gallery Section --- */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Village Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/images/village1.jpg" alt="Village Scene 1" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village2.jpg" alt="Village Scene 2" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village3.jpg" alt="Village Scene 3" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village4.jpg" alt="Village Scene 4" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village5.jpg" alt="Village Scene 5" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village6.jpg" alt="Village Scene 6" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village7.jpg" alt="Village Scene 7" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village8.jpg" alt="Village Scene 8" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village9.jpg" alt="Village Scene 9" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village10.jpg" alt="Village Scene 10" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village11.jpg" alt="Village Scene 11" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village12.jpg" alt="Village Scene 12" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village13.jpg" alt="Village Scene 13" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village14.jpg" alt="Village Scene 14" className="w-full h-48 object-cover rounded-lg shadow-md" />
          <img src="/images/village15.jpg" alt="Village Scene 15" className="w-full h-48 object-cover rounded-lg shadow-md" />

        </div>
      </div>

      {/* --- NEW: How It Works Section --- */}
      <div className="bg-white">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Register & Login</h3>
              <p className="text-gray-600">Create your account or log in if you already have one. It's fast and easy.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Submit Complaint</h3>
              <p className="text-gray-600">Go to your dashboard, fill out the form with details, photo, and location of the issue.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">3. Get It Resolved</h3>
              <p className="text-gray-600">The Sarpanch will review your complaint and take necessary action to resolve the issue.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- NEW: Footer --- */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 Sarpanch Sahayak | Developed for Gahmar Village</p>
      </footer>
    </div>
  );
};

export default HomePage;