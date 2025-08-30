import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of Link
import api from '../services/api';

const ComplaintList = () => {
  const { status: statusFilter } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComplaints = async () => {
    // ... (This function remains the same)
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const config = { headers: { 'x-auth-token': token } };
      const res = await api.get('/complaints', config);
      setComplaints(res.data);
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

  useEffect(() => {
    // ... (This effect remains the same)
    if (statusFilter && statusFilter !== 'all') {
      const filtered = complaints.filter(c => c.status.toLowerCase().replace(' ', '-') === statusFilter);
      setFilteredComplaints(filtered);
    } else {
      setFilteredComplaints(complaints);
    }
  }, [statusFilter, complaints]);

  const handleStatusChange = async (id, newStatus) => {
    // We don't need to pass the event 'e' anymore with the new structure
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      await api.put(`/complaints/${id}/status`, { status: newStatus }, config);
      fetchComplaints(); 
    } catch (err) {
      alert('Failed to update status.');
      console.error(err);
    }
  };

  // This function will handle the click on the card
  const handleCardClick = (complaintId) => {
    navigate(`/complaint/${complaintId}`);
  };
  
  // ... (stats calculation remains the same)
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Complaints Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg"><h2 className="text-xl font-bold">{total}</h2><p>Total Complaints</p></div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg"><h2 className="text-xl font-bold">{pending}</h2><p>Pending</p></div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg"><h2 className="text-xl font-bold">{resolved}</h2><p>Resolved</p></div>
      </div>
      <h2 className="text-2xl font-semibold mb-4 capitalize">{statusFilter ? statusFilter.replace('-', ' ') : 'All'} Complaints ({filteredComplaints.length})</h2>
      
      {filteredComplaints.length === 0 ? (
        <p>No complaints found for this status.</p>
      ) : (
        <div className="space-y-6">
          {filteredComplaints.map((complaint) => (
            // The <Link> wrapper is removed.
            // The onClick handler is added to the main div.
            <div 
              key={complaint._id} 
              onClick={() => handleCardClick(complaint._id)} 
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-50 transition duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3"><img src={complaint.imageUrl} alt={complaint.category} className="w-full h-48 object-cover rounded-md"/></div>
                <div className="md:w-2/3">{/* ... card content ... */}</div>
              </div>
              <div className="mt-4 border-t pt-4">
                <label 
                  htmlFor={`status-${complaint._id}`} 
                  className="block text-sm font-medium text-gray-700" 
                  onClick={(e) => e.stopPropagation()} // Stop click on the label
                >
                  Change Status:
                </label>
                <select
                  id={`status-${complaint._id}`}
                  value={complaint.status}
                  onClick={(e) => e.stopPropagation()} // Stop click on the dropdown
                  onChange={(e) => {
                    e.stopPropagation(); // Stop click on change as well
                    handleStatusChange(complaint._id, e.target.value);
                  }}
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
      )}
    </div>
  );
};

export default ComplaintList;