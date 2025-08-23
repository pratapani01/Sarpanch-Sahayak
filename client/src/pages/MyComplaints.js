import React, { useState, useEffect } from 'react';
import api from '../services/api';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyComplaints = async () => {
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

        // Naye API endpoint ko call karein
        const res = await api.get('/complaints/mycomplaints', config);
        setComplaints(res.data);
      } catch (err) {
        setError('Failed to fetch your complaints.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyComplaints();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading your complaints...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">My Submitted Complaints</h1>
      {complaints.length === 0 ? (
        <p>You have not submitted any complaints yet.</p>
      ) : (
        <div className="space-y-6">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={complaint.imageUrl}
                  alt={complaint.category}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <div className="md:w-2/3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                    {complaint.category}
                  </span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      complaint.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                      complaint.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                    {complaint.status}
                  </span>
                </div>
                <p className="text-gray-700 my-4">{complaint.description}</p>
                <p className="text-xs text-gray-500">
                  Submitted on: {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComplaints;