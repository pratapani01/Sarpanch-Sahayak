import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Welcome to Gahmar (गहमर)
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Asia's Largest Village | Ghazipur, Uttar Pradesh
        </p>
      </div>

      {/* Grid for information cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* About Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">About the Village</h2>
          <p className="text-gray-600">
            Gahmar is renowned for its significant population and rich history,
            with a strong tradition of its residents serving in the Indian Army.
            Every household has a connection to the armed forces, earning it the
            title "Home of the Brave."
          </p>
        </div>

        {/* Key Statistics Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Key Statistics</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>District:</strong> Ghazipur</li>
            <li><strong>State:</strong> Uttar Pradesh</li>
            <li><strong>Population:</strong> Approx. 1,25,000</li>
            <li><strong>Established:</strong> 1530 AD</li>
          </ul>
        </div>

        {/* Important Contacts Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Important Contacts</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Sarpanch:</strong> Smt. Balika Devi</li>
            <li><strong>Secretary:</strong> Shri. Ram Kumar</li>
            <li><strong>Local Police Station:</strong> 112</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;