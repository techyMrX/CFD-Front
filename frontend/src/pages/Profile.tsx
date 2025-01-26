import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Contact {
  id: number;
  name: string;
  phone: string;
  relationship: string;
  relationship_detail: string;
}

interface UserProfile {
  name: string;
  email: string;
  contacts: Contact[];
}

function Profile(): JSX.Element {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [relationshipDetail, setRelationshipDetail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const relationshipCategories = ['Family', 'Local Police', 'Emergency'];

  useEffect(() => {
    fetchProfile();
    fetchContacts();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend-cfd.onrender.com/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend-cfd.onrender.com/api/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setContacts(data.contacts);
      }
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend-cfd.onrender.com/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          phone,
          relationship,
          relationship_detail: relationshipDetail
        })
      });

      if (response.ok) {
        setSuccess('Contact added successfully');
        setName('');
        setPhone('');
        setRelationshipDetail('');
        setShowAddContact(false);
        fetchContacts();
      } else {
        setError('Failed to add contact');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {profile && (
          <div className="space-y-4">
            <div>
              <label className="text-gray-600">Name</label>
              <p className="text-lg font-medium">{profile.name}</p>
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <p className="text-lg font-medium">{profile.email}</p>
            </div>
            <div>
              <label className="text-gray-600">Role</label>
              <p className="text-lg font-medium capitalize">{user?.role}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Emergency Contacts</h3>
          <button
            onClick={() => setShowAddContact(!showAddContact)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {showAddContact ? 'Cancel' : 'Add Contact'}
          </button>
        </div>

        {showAddContact && (
          <div className="mb-6">
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {success && <div className="text-green-600 mb-4">{success}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Relationship Category</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {relationshipCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Relationship Detail</label>
                <input
                  type="text"
                  value={relationshipDetail}
                  onChange={(e) => setRelationshipDetail(e.target.value)}
                  placeholder="e.g., Brother, Local Station, Hospital"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Contact
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="border-b pb-4">
              <h4 className="font-medium">{contact.name}</h4>
              <p className="text-gray-600">{contact.phone}</p>
              <p className="text-gray-500 text-sm">
                {contact.relationship} - {contact.relationship_detail}
              </p>
            </div>
          ))}
          {contacts.length === 0 && !showAddContact && (
            <p className="text-gray-500 text-center">No emergency contacts added yet.</p>
          )}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile; 