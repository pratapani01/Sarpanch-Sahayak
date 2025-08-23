import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import api from '../services/api';

const ComplaintList = () => {
  const { status: statusFilter } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComplaints = async () => {
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
    if (statusFilter && statusFilter !== 'all') {
      const filtered = complaints.filter(c => c.status.toLowerCase().replace(' ', '-') === statusFilter);
      setFilteredComplaints(filtered);
    } else {
      setFilteredComplaints(complaints);
    }
  }, [statusFilter, complaints]);

  const handleStatusChange = async (id, newStatus, e) => {
    e.stopPropagation(); // Prevent the link from being triggered
    e.preventDefault(); // Prevent default select behavior
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
            // --- WRAP THE CARD IN A LINK HERE ---
            <Link to={`/complaint/${complaint._id}`} key={complaint._id} className="block hover:bg-gray-50 transition duration-300">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3"><img src={complaint.imageUrl} alt={complaint.category} className="w-full h-48 object-cover rounded-md"/></div>
                  <div className="md:w-2/3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">{complaint.category}</span>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${complaint.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : complaint.status === 'In Progress' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>{complaint.status}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{complaint.description}</p>
                    <div className="text-sm text-gray-500">
                      <p><strong>Submitted By:</strong> {complaint.submittedBy.name} ({complaint.submittedBy.email})</p>
                      <p><strong>Location:</strong> {complaint.location.latitude.toFixed(4)}, {complaint.location.longitude.toFixed(4)}</p>
                      <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                  <label htmlFor={`status-${complaint._id}`} className="block text-sm font-medium text-gray-700">Change Status:</label>
                  <select
                    id={`status-${complaint._id}`}
                    value={complaint.status}
                    onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to the Link
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value, e)}
                    className="mt-1 block w-full md:w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;