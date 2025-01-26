import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Criminal {
  id: number;
  name: string;
  details: string;
  image_path: string;
}

function AdminDashboard(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [criminals, setCriminals] = useState<Criminal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchCriminals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://backend-cfd.onrender.com/api/criminals', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCriminals(data.criminals);
        } else {
          throw new Error('Failed to fetch criminals');
        }
      } catch (err) {
        setError('Error fetching criminal records');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCriminals();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Criminal Database Management */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Criminal Database</h2>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/police/add-criminal')}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Add New Criminal Record
            </button>
            <button
              onClick={() => navigate('/view-criminals')}
              className="w-full bg-indigo-100 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-200"
            >
              View Criminal Records
            </button>
          </div>
        </div>

        {/* System Management */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">System Management</h2>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/user-management')}
              className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md"
            >
              User Management
            </button>
            <button
              onClick={() => navigate('/system-settings')}
              className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md"
            >
              System Settings
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="space-y-2">
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <>
                <p className="text-gray-600">Total Records: {criminals.length}</p>
                <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/identify')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Face Recognition
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 