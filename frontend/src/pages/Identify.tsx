import { useState } from 'react';
import { Upload, Search } from 'lucide-react';

interface IdentifyResult {
  name: string;
  details: string;
  confidence: number;
}

function Identify(): JSX.Element {
  const [image, setImage] = useState<File | null>(null);
  const [results, setResults] = useState<IdentifyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setError('');
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setError('');
    }
  };

  const handleStartIdentification = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('image', image);
    if (searchQuery) {
      formData.append('query', searchQuery);
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Sending request...'); // Debug log
      
      const response = await fetch('http://localhost:5000/api/identify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      console.log('Response received:', response.status); // Debug log
      
      const data = await response.json();
      console.log('Data:', data); // Debug log
      
      if (response.ok) {
        setResults(data.matches || []);
        if (data.matches?.length === 0) {
          setError('No matches found');
        }
      } else {
        setError(data.message || 'Error processing image');
      }
    } catch (err) {
      console.error('Error:', err); // Debug log
      setError('Error processing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Criminal Identification</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8"
            onDrop={handleImageDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {image ? (
              <div className="space-y-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg"
                />
                <button
                  onClick={() => setImage(null)}
                  className="text-red-600 hover:text-red-500"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-600">
                  Drag and drop an image here, or{' '}
                  <label className="text-indigo-600 cursor-pointer hover:text-indigo-500">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageSelect}
                    />
                  </label>
                </p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Search by name (optional)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleStartIdentification}
            disabled={!image || loading}
            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Start Identification'}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-medium">{result.name}</h3>
                  <p className="text-gray-600">{result.details}</p>
                  <p className="text-sm text-gray-500">
                    Match confidence: {(result.confidence * 100).toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No matches found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Identify; 