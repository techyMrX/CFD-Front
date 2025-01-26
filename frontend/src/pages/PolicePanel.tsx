import { useState } from 'react';

interface CriminalData {
  name: string;
  details: string;
  image: File | null;
}

function PolicePanel(): JSX.Element {
  const [criminalData, setCriminalData] = useState<CriminalData>({
    name: '',
    details: '',
    image: null
  });
  const [message, setMessage] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCriminalData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!criminalData.image || !criminalData.name) {
      setMessage('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', criminalData.name);
    formData.append('details', criminalData.details);
    formData.append('image', criminalData.image);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend-cfd.onrender.com/api/police/add-criminal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      setMessage(data.message);
      
      if (response.ok) {
        setCriminalData({ name: '', details: '', image: null });
      }
    } catch (error) {
      setMessage('Error adding criminal record');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Police Panel - Add Criminal Record</h2>
      
      {message && (
        <div className={`p-4 mb-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Criminal Name *
          </label>
          <input
            type="text"
            value={criminalData.name}
            onChange={(e) => setCriminalData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5B45F8] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Details
          </label>
          <textarea
            value={criminalData.details}
            onChange={(e) => setCriminalData(prev => ({ ...prev, details: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5B45F8] focus:border-transparent"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Criminal Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#5B45F8] text-white py-2 px-4 rounded-lg hover:bg-[#4935E8] transition-colors"
        >
          Add Criminal Record
        </button>
      </form>
    </div>
  );
}

export default PolicePanel; 