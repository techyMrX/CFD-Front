import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function SystemSettings(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoLogoutTime, setAutoLogoutTime] = useState('30');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSaveSettings = async () => {
    try {
      setSuccess('Settings saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save settings');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Security Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Auto Logout Time (minutes)
              </label>
              <select
                value={autoLogoutTime}
                onChange={(e) => setAutoLogoutTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Enable System Notifications
              </label>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Database Management</h2>
          <div className="space-y-4">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to backup the database?')) {
                  // Add backup logic here
                }
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Backup Database
            </button>
          </div>
        </div>

        {/* System Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">System Information</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Version: 1.0.0</p>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            <p>Environment: Production</p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSaveSettings}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default SystemSettings; 