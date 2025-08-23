import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const ComplaintDetail = () => {
  const { id } = useParams(); // Get the complaint ID from the URL
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await api.get(`/complaints/${id}`, config);
        setComplaint(res.data);
      } catch (err) {
        setError('Failed to fetch complaint details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!complaint) return <div className="text-center p-10">Complaint not found.</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link to="/dashboard" className="text-indigo-600 hover:underline mb-6 inline-block">&larr; Back to Dashboard</Link>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Image & Map */}
          <div className="md:w-1/2">
            <img src={complaint.imageUrl} alt={complaint.category} className="w-full object-cover rounded-lg shadow-md mb-6" />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            {/* Placeholder for a map */}
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map will be here</p>
            </div>
             <p className="text-xs text-gray-500 mt-1">Coordinates: {complaint.location.latitude.toFixed(5)}, {complaint.location.longitude.toFixed(5)}</p>
          </div>

          {/* Right side - Details & Comments */}
          <div className="md:w-1/2">
            <div className="flex justify-between items-start mb-4">
              <span className="text-lg font-semibold text-indigo-600 bg-indigo-100 px-4 py-1 rounded-full">
                {complaint.category}
              </span>
              <span className={`text-lg font-bold px-4 py-1 rounded-full ${
                  complaint.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                  complaint.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                  'bg-green-200 text-green-800'
                }`}>
                {complaint.status}
              </span>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-700 mb-4">{complaint.description}</p>
            </div>

            <div className="border-t pt-4 mt-4 text-sm text-gray-600">
               <p><strong>Submitted By:</strong> {complaint.submittedBy.name} ({complaint.submittedBy.email})</p>
               <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
            </div>
            
            {/* Placeholder for comments section */}
            <div className="border-t pt-4 mt-4">
               <h3 className="text-xl font-semibold mb-2">Comments / Updates</h3>
               <div className="bg-gray-50 p-4 rounded-lg min-h-[100px]">
                 <p className="text-gray-500">Comments feature coming soon...</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;