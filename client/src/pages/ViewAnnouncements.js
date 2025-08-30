import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ViewAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get('/announcements');
        setAnnouncements(res.data);
      } catch (err) {
        console.error('Failed to fetch announcements', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Village Announcements</h1>
        {announcements.length === 0 ? (
          <p className="text-center text-gray-600">No active announcements at the moment.</p>
        ) : (
          <div className="space-y-6">
            {announcements.map((ann) => (
              <div key={ann._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  {ann.imageUrl && (
                    <div className="md:flex-shrink-0">
                      <img className="h-48 w-full object-cover md:w-48" src={ann.imageUrl} alt={ann.title} />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{new Date(ann.startDate).toLocaleDateString()}</div>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{ann.title}</h2>
                    <p className="mt-2 text-gray-500">{ann.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAnnouncements;