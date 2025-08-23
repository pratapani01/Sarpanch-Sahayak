import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import MapDisplay from '../components/MapDisplay';

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // ... fetchComplaint logic remains the same
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const config = { headers: { 'x-auth-token': token } };
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

  const position = [complaint.location.latitude, complaint.location.longitude];
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${complaint.location.latitude},${complaint.location.longitude}`;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link to="/dashboard/all" className="text-indigo-600 hover:underline mb-6 inline-block">&larr; Back to Dashboard</Link>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img src={complaint.imageUrl} alt={complaint.category} className="w-full object-cover rounded-lg shadow-md mb-6" />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
              <MapDisplay position={position} description={complaint.description} />
            </div>
            <p className="text-xs text-gray-500 mt-1">Coordinates: {complaint.location.latitude.toFixed(5)}, {complaint.location.longitude.toFixed(5)}</p>
            
            {/* --- NEW LINK ADDED HERE --- */}
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-2 inline-block text-indigo-600 hover:underline text-sm font-semibold"
            >
              Open in Google Maps &rarr;
            </a>
            {/* --- END OF NEW LINK --- */}

          </div>

          <div className="md:w-1/2">
            {/* ... rest of the details and comments code remains the same ... */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-lg font-semibold text-indigo-600 bg-indigo-100 px-4 py-1 rounded-full">{complaint.category}</span>
              <span className={`text-lg font-bold px-4 py-1 rounded-full ${
                  complaint.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                  complaint.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                  'bg-green-200 text-green-800'
                }`}>{complaint.status}</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-700 mb-4">{complaint.description}</p>
            </div>
            <div className="border-t pt-4 mt-4 text-sm text-gray-600">
               <p><strong>Submitted By:</strong> {complaint.submittedBy.name} ({complaint.submittedBy.email})</p>
               <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
            </div>
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