import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
}

interface NewContact {
  name: string;
  relationship: string;
  phone: string;
}

function Contacts(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<NewContact>({
    name: '',
    relationship: '',
    phone: ''
  });

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now() }]);
      setNewContact({ name: '', relationship: '', phone: '' });
    }
  };

  const handleDeleteContact = (id: number): void => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Emergency Contacts</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Contact</h3>
        <form onSubmit={handleAddContact} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5B45F8] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Relationship"
              value={newContact.relationship}
              onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5B45F8] focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={newContact.phone}
              onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5B45F8] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto flex items-center justify-center space-x-2 bg-[#5B45F8] text-white py-2 px-4 rounded-lg hover:bg-[#4935E8] transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Contact</span>
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Your Contacts</h3>
        {contacts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No contacts added yet</p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{contact.name}</h4>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="text-red-600 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contacts;