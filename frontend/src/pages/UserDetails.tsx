import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Contact {
  id: number;
  name: string;
  phone: string;
  relationship: string;
  relationship_detail: string;
}

interface UserDetail {
  id: number;
  name: string;
  email: string;
  role: string;
}

function UserDetails(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetail | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchUserDetails();
  }, [id, user]);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://backend-cfd.onrender.com/api/users/${id}/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (response.ok) {
        setUserDetails(data.user);
        setContacts(data.contacts);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching user details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Details</h1>
        <button
          onClick={() => navigate('/user-management')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Back to Users
        </button>
      </div>

      {/* User Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{userDetails?.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{userDetails?.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Role</p>
            <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
              userDetails?.role === 'admin' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {userDetails?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
        {contacts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No emergency contacts found</p>
        ) : (
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="border rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Name</p>
                    <p className="font-medium">{contact.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-medium">{contact.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Relationship</p>
                    <p className="font-medium">{contact.relationship}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Relationship Detail</p>
                    <p className="font-medium">{contact.relationship_detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails; 