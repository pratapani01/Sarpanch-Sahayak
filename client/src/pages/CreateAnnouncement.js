import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateAnnouncement = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    endDate: '',
  });
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const { title, description, endDate } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onFileChange = (e) => setImage(e.target.files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const announcementData = new FormData();
    announcementData.append('title', title);
    announcementData.append('description', description);
    if (endDate) announcementData.append('endDate', endDate);
    if (image) announcementData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      };
      await api.post('/announcements', announcementData, config);
      alert('Announcement created successfully!');
      navigate('/dashboard'); // Or navigate to a new "Manage Announcements" page
    } catch (err) {
      alert('Failed to create announcement.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-4">Create New Announcement</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" value={title} onChange={onChange} required className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={description} onChange={onChange} required rows="5" className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Expiration Date (Optional)</label>
            <input type="date" name="endDate" value={endDate} onChange={onChange} className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image (Optional)</label>
            <input type="file" name="image" onChange={onFileChange} className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
          </div>
          <div className="text-right">
            <button type="submit" disabled={submitting} className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
              {submitting ? 'Publishing...' : 'Publish Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncement;