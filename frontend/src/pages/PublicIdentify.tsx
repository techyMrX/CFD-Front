import { useState } from 'react';
import { Upload } from 'lucide-react';

interface IdentifyResult {
  name: string;
  details: string;
}

interface IdentifyState {
  image: File | null;
  results: IdentifyResult[];
  loading: boolean;
  error: string;
}

function PublicIdentify(): JSX.Element {
  const [state, setState] = useState<IdentifyState>({
    image: null,
    results: [],
    loading: false,
    error: ''
  });

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setState(prev => ({ ...prev, image: file, error: '' }));
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setState(prev => ({ ...prev, image: file, error: '' }));
    }
  };

  const handleIdentify = async () => {
    if (!state.image) {
      setState(prev => ({ ...prev, error: 'Please select an image' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: '' }));
    const formData = new FormData();
    formData.append('image', state.image);

    try {
      const response = await fetch('http://localhost:5173/api/public/identify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      const data = await response.json();
      setState(prev => ({
        ...prev,
        loading: false,
        results: data.matches || []
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error processing image'
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Criminal Identification</h2>

      {state.error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
          {state.error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center"
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {state.image ? (
            <div className="space-y-4">
              <img
                src={URL.createObjectURL(state.image)}
                alt="Preview"
                className="max-w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setState(prev => ({ ...prev, image: null }))}
                className="text-red-600 hover:text-red-500"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-center">
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
            </>
          )}
        </div>

        <div className="space-y-6">
          <button
            onClick={handleIdentify}
            disabled={state.loading}
            className="w-full bg-[#5B45F8] text-white py-2 px-4 rounded-lg hover:bg-[#4935E8] transition-colors disabled:bg-gray-400"
          >
            {state.loading ? 'Processing...' : 'Identify Criminal'}
          </button>

          {state.results.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">Results:</h3>
              {state.results.map((result, index) => (
                <div key={index} className="border-b py-2">
                  <p className="font-medium">{result.name}</p>
                  <p className="text-sm text-gray-600">{result.details}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicIdentify; 