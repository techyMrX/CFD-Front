import React, { useState } from 'react';
import { Upload, Search } from 'lucide-react';

export function IdentifySection() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Criminal Identification</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="max-w-full h-auto rounded-lg mx-auto"
            />
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-gray-400" />
              <p className="text-gray-600">
                Drag and drop an image here, or{' '}
                <button className="text-indigo-600 hover:text-indigo-500">
                  browse
                </button>
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors">
            Start Identification
          </button>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Upload a clear photo of the person</li>
              <li>Our system will analyze the image</li>
              <li>Results will show potential matches</li>
              <li>Contact authorities if a match is found</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}