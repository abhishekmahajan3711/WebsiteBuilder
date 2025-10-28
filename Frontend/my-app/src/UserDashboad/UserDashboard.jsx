import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWebsites } from '../redux/websitesSlice';

// Simple Modal component
const Modal = ({ open, title, message, onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancel', onlyConfirm = false }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[300px] max-w-xs flex flex-col items-center">
        <div className="font-bold text-lg text-purple-700 mb-2">{title}</div>
        <div className="text-gray-700 mb-4 text-center">{message}</div>
        <div className="flex gap-4">
          {!onlyConfirm && <button className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300" onClick={onCancel}>{cancelText}</button>}
          <button className="px-4 py-1 rounded bg-purple-600 text-white hover:bg-purple-700" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('websites');
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const { websites, loading, error, fetched } = useSelector(state => state.websites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, type: '', websiteId: null, message: '', title: '' });

  useEffect(() => {
    if (activeTab === 'websites' && user && token && !fetched) {
      dispatch(fetchWebsites(token));
    }
  }, [activeTab, user, token, dispatch, fetched]);

  const handleTab = (tab) => {
    if (tab === 'new') navigate('/dashboard/new-website');
    else if (tab === 'plan') navigate('/dashboard/my-plan');
    else setActiveTab('websites');
  };

  const handleDelete = (id) => {
    setModal({ open: true, type: 'confirm', websiteId: id, title: 'Delete Website', message: 'Are you sure you want to delete this website?' });
  };

  const handleEdit = (site) => {
    navigate('/dashboard/edit-website', { state: { website: site } });
  };

  const confirmDelete = async () => {
    const id = modal.websiteId;
    setModal(m => ({ ...m, open: false }));
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/websites/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setModal({ open: true, type: 'success', title: 'Deleted', message: 'Website deleted successfully!', websiteId: null });
        dispatch(fetchWebsites(token));
      } else {
        setModal({ open: true, type: 'error', title: 'Error', message: data.message || 'Failed to delete website', websiteId: null });
      }
    } catch (err) {
      setModal({ open: true, type: 'error', title: 'Error', message: 'Error deleting website', websiteId: null });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-teal-50 to-white px-4 pt-4">
      <div className="flex gap-4 mb-8 mt-2">
        <button
          className={`px-6 py-2 rounded-lg font-semibold shadow ${activeTab === 'websites' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 border border-purple-600'} cursor-pointer hover:bg-purple-50`}
          onClick={() => handleTab('websites')}
        >
          My Websites
        </button>
        <button
          className="px-6 py-2 rounded-lg font-semibold shadow bg-white text-purple-700 border border-purple-600 cursor-pointer hover:bg-purple-50"
          onClick={() => handleTab('new')}
        >
          Create New Website
        </button>
        <button
          className="px-6 py-2 rounded-lg font-semibold shadow bg-white text-purple-700 border border-purple-600 cursor-pointer hover:bg-purple-50"
          onClick={() => handleTab('plan')}
        >
          My Plans
        </button>
        <button
          className="px-6 py-2 rounded-lg font-semibold shadow bg-white text-purple-700 border border-purple-600 cursor-pointer hover:bg-purple-50"
          onClick={() => navigate('/dashboard/profile')}
        >
          Profile
        </button>
      </div>
      {activeTab === 'websites' && (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">My Websites</h1>
          {loading ? (
            <div className="text-center text-lg text-gray-500 py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : websites.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No websites found. Click 'Create New Website' to get started!</div>
          ) : (
            <div className="space-y-4">
              {websites.map(site => (
                <div key={site._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-teal-50">
                  <div>
                    <div className="font-semibold text-lg text-purple-800">{site.title || 'Untitled Website'}</div>
                    <div className="text-gray-500 text-sm">{site.slug || 'No URL'}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-1 bg-teal-500 text-white rounded hover:bg-teal-600" onClick={() => handleEdit(site)}>Edit</button>
                    <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(site._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.type === 'confirm' ? confirmDelete : () => setModal(m => ({ ...m, open: false }))}
        onCancel={() => setModal(m => ({ ...m, open: false }))}
        confirmText={modal.type === 'confirm' ? 'Delete' : 'OK'}
        cancelText="Cancel"
        onlyConfirm={modal.type !== 'confirm'}
      />
    </div>
  );
};

export default UserDashboard;
