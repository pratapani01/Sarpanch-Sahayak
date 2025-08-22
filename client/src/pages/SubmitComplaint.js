import React, { useState } from 'react';
import api from '../services/api'; // Our axios instance

const SubmitComplaint = () => {
  const [formData, setFormData] = useState({
    category: 'Roads',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false); // For loading state on submit button

  const { category, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.');
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationLoading(false);
        alert('Location captured successfully!');
      },
      () => {
        alert('Unable to retrieve your location.');
        setLocationLoading(false);
      }
    );
  };

  // The final, fully functional onSubmit logic
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!image || !location) {
      return alert('Please upload an image and capture your location.');
    }
    setSubmitting(true);

    // 1. Create a FormData object to send file and text data together
    const complaintData = new FormData();
    complaintData.append('image', image);
    complaintData.append('category', category);
    complaintData.append('description', description);
    complaintData.append('latitude', location.latitude);
    complaintData.append('longitude', location.longitude);

    try {
      // 2. Get the auth token from localStorage
      const token = localStorage.getItem('token');

      // 3. Set up the headers for the API request
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token, // Send the token for authentication
        },
      };

      // 4. Send the POST request to the backend
      const res = await api.post('/complaints', complaintData, config);

      console.log('Server response:', res.data);
      alert('Complaint submitted successfully!');
      // Optional: Clear the form after successful submission
      setFormData({ category: 'Roads', description: '' });
      setImage(null);
      setLocation(null);

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Failed to submit complaint. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
          Register a New Complaint
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Form fields are the same as before */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
            <select name="category" value={category} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option>Roads</option>
              <option>Sanitation</option>
              <option>Water</option>
              <option>Electricity</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Describe the Issue</label>
            <textarea name="description" value={description} onChange={onChange} rows="4" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Please provide details about the problem and location..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capture Location</label>
            <button type="button" onClick={handleGetLocation} className="w-full px-4 py-2 font-semibold text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none">
              {locationLoading ? 'Fetching...' : (location ? `Location Captured: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Get Current Location')}
            </button>
             {location && <p className="text-xs text-green-600 mt-1">Location will be submitted with your complaint.</p>}
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Take/Upload Photo</label>
            <input type="file" name="image" accept="image/*" capture="environment" required onChange={onFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          </div>
          <div>
            <button type="submit" disabled={submitting} className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
              {submitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitComplaint;