import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Criminal {
  id: number;
  name: string;
  details: string;
  image_path: string;
}

function ViewCriminals(): JSX.Element {
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
        const response = await fetch('http://localhost:5000/api/criminals', {
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Criminal Records</h1>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Back to Dashboard
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : error ? (
        <div className="text-red-600 text-center py-4">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {criminals.map((criminal) => (
            <div key={criminal.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={`http://localhost:5000/${criminal.image_path}`}
                alt={criminal.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{criminal.name}</h3>
              <p className="text-gray-600">{criminal.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewCriminals; 