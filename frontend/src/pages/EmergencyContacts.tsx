import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Contact {
  id: number;
  name: string;
  phone: string;
  relationship: string;
  relationship_detail: string;
}

function EmergencyContacts() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [relationshipDetail, setRelationshipDetail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const relationshipCategories = ['Family', 'Local Police', 'Emergency'];

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setContacts(data.contacts);
      }
    } catch (err) {
      setError('Failed to fetch contacts');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/contacts', {
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
        fetchContacts();
      } else {
        setError('Failed to add contact');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Emergency Contacts</h2>

      {/* Add Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Contact</h3>
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

      {/* Contacts List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Your Contacts</h3>
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="border p-4 rounded-md">
              <h4 className="font-semibold">{contact.name}</h4>
              <p className="text-gray-600">{contact.phone}</p>
              <p className="text-sm text-gray-500">
                {contact.relationship} - {contact.relationship_detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmergencyContacts; 