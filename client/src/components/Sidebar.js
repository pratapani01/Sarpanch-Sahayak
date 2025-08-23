import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';
import Modal from './Modal'; // Import the new Modal component

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  const navLinkStyles = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    backgroundColor: isActive ? '#eef2ff' : '',
    color: isActive ? '#4f46e5' : '#4b5563',
  });

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (error) {
      console.error('Failed to fetch contacts', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setUser(jwtDecode(token).user);
      } catch (e) { console.error(e) }
    }
    fetchContacts();
  }, []);

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      await api.post('/contacts', newContact, config);
      setIsModalOpen(false);
      setNewContact({ name: '', phone: '' });
      fetchContacts(); // Refresh contacts list
    } catch (error) {
      alert('Failed to add contact.');
      console.error(error);
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        await api.delete(`/contacts/${id}`, config);
        fetchContacts(); // Refresh contacts list
      } catch (error) {
        alert('Failed to delete contact.');
        console.error(error);
      }
    }
  };

  return (
    <>
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:top-0 md:h-full md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white shadow-md z-30`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Complaints Section */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Complaints</h2>
            <nav className="mt-2">
              <NavLink onClick={toggleSidebar} to="/dashboard/all" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">All Complaints</NavLink>
              <NavLink onClick={toggleSidebar} to="/dashboard/pending" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">Pending</NavLink>
              <NavLink onClick={toggleSidebar} to="/dashboard/in-progress" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">In Progress</NavLink>
              <NavLink onClick={toggleSidebar} to="/dashboard/resolved" style={navLinkStyles} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">Resolved</NavLink>
            </nav>
          </div>

          <hr className="my-6" />

          {/* Local Services Section */}
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Local Services</h2>
              {user && user.role === 'sarpanch' && (
                <button onClick={() => setIsModalOpen(true)} className="text-indigo-600 text-xl font-bold hover:text-indigo-800">+</button>
              )}
            </div>
            <div className="mt-3 text-sm text-gray-600 space-y-3">
              {contacts.map(contact => (
                <div key={contact._id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <a href={`tel:${contact.phone}`} className="text-indigo-600 hover:underline">{contact.phone}</a>
                  </div>
                  {user && user.role === 'sarpanch' && (
                    <button onClick={() => handleDeleteContact(contact._id)} className="text-red-500 hover:text-red-700 text-lg">&times;</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr className="my-6" />

          {/* Emergency Services Section */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Emergency Services</h2>
            <div className="mt-3 text-sm text-gray-600 space-y-3">
              <div><p className="font-semibold">Police</p><a href="tel:112" className="text-indigo-600 hover:underline">112</a></div>
              <div><p className="font-semibold">Ambulance</p><a href="tel:102" className="text-indigo-600 hover:underline">102</a></div>
              <div><p className="font-semibold">Fire Dept.</p><a href="tel:101" className="text-indigo-600 hover:underline">101</a></div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Contact">
        <form onSubmit={handleAddContact}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" id="name" value={newContact.name} onChange={(e) => setNewContact({...newContact, name: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" name="phone" id="phone" value={newContact.phone} onChange={(e) => setNewContact({...newContact, phone: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={() => setIsModalOpen(false)} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Add Contact</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Sidebar;