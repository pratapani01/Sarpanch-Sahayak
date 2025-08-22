import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ComplaintList = () => {
  const [categorizedComplaints, setCategorizedComplaints] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const config = { headers: { 'x-auth-token': token } };
      const res = await api.get('/complaints', config);
      const grouped = res.data.reduce((acc, complaint) => {
        const category = complaint.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(complaint);
        return acc;
      }, {});
      setCategorizedComplaints(grouped);
    } catch (err) {
      setError('Failed to fetch complaints.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // NEW FUNCTION to handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      // Send the new status to the backend
      await api.put(`/complaints/${id}/status`, { status: newStatus }, config);
      // Refresh the list to show the change
      fetchComplaints(); 
    } catch (err) {
      alert('Failed to update status.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-10">Loading complaints...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">All Submitted Complaints</h1>
      {Object.keys(categorizedComplaints).length === 0 ? (
        <p>No complaints have been submitted yet.</p>
      ) : (
        Object.keys(categorizedComplaints).map(category => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-indigo-500">{category}</h2>
            <div className="space-y-6">
              {categorizedComplaints[category].map((complaint) => (
                <div key={complaint._id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image Section */}
                    <div className="md:w-1/3">
                      <img src={complaint.imageUrl} alt={complaint.category} className="w-full h-48 object-cover rounded-md"/>
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
                        <p><strong>Submitted By:</strong> {complaint.submittedBy.name} ({complaint.submittedBy.email})</p>
                        <p><strong>Location:</strong> {complaint.location.latitude.toFixed(4)}, {complaint.location.longitude.toFixed(4)}</p>
                        <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  {/* NEW Dropdown for changing status */}
                  <div className="mt-4 border-t pt-4">
                    <label htmlFor={`status-${complaint._id}`} className="block text-sm font-medium text-gray-700">Change Status:</label>
                    <select
                      id={`status-${complaint._id}`}
                      value={complaint.status}
                      onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                      className="mt-1 block w-full md:w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
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