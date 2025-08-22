import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ComplaintList = () => {
  const [categorizedComplaints, setCategorizedComplaints] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in.');
        }

        const config = {
          headers: {
            'x-auth-token': token,
          },
        };

        const res = await api.get('/complaints', config);
        
        // Group the complaints by category
        const grouped = res.data.reduce((acc, complaint) => {
          const category = complaint.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(complaint);
          return acc;
        }, {});
        
        setCategorizedComplaints(grouped);

      } catch (err) {
        setError('Failed to fetch complaints. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading complaints...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">All Submitted Complaints</h1>

      {Object.keys(categorizedComplaints).length === 0 ? (
        <p>No complaints have been submitted yet.</p>
      ) : (
        // Map over each category (e.g., 'Roads', 'Water')
        Object.keys(categorizedComplaints).map(category => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-indigo-500">
              {category}
            </h2>
            <div className="space-y-6">
              {/* Map over the complaints within that category */}
              {categorizedComplaints[category].map((complaint) => (
                <div key={complaint._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
                  {/* Image Section */}
                  <div className="md:w-1/3">
                    <img
                      src={complaint.imageUrl}
                      alt={complaint.category}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>

                  {/* Details Section */}
                  <div className="md:w-2/3">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                          complaint.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                          complaint.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                        {complaint.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{complaint.description}</p>
                    <div className="text-sm text-gray-500">
                      <p>
                        <strong>Submitted By:</strong> {complaint.submittedBy.name} ({complaint.submittedBy.email})
                      </p>
                      <p>
                        <strong>Location:</strong> {complaint.location.latitude.toFixed(4)}, {complaint.location.longitude.toFixed(4)}
                      </p>
                      <p>
                        <strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ComplaintList;