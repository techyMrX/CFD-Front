import React, { useState } from 'react';
import { MapPin, Phone, AlertTriangle, Send } from 'lucide-react';

export function EmergencySection() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <section className="bg-red-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Emergency Assistance</h2>
          <p className="text-gray-600">
            Feel unsafe? Share your location with emergency contacts and authorities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Share Location</h3>
            
            <div className="space-y-4">
              <button
                onClick={handleGetLocation}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-500 transition-colors"
              >
                <MapPin className="h-5 w-5" />
                <span>Share My Location</span>
              </button>

              {location && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Current Location:</p>
                  <p className="font-medium">
                    Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                  </p>
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Emergency Contacts</h4>
                <div className="space-y-2">
                  {['Family', 'Local Police', 'Emergency Services'].map((contact) => (
                    <label key={contact} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-red-600" />
                      <span>{contact}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Send Alert</h3>
            
            <div className="space-y-4">
              <textarea
                placeholder="Describe your situation (optional)"
                className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              ></textarea>

              <button className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-500 transition-colors">
                <Send className="h-5 w-5" />
                <span>Send Emergency Alert</span>
              </button>

              <div className="text-center">
                <a
                  href="tel:911"
                  className="inline-flex items-center space-x-2 text-red-600 hover:text-red-500"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Emergency Services (911)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}