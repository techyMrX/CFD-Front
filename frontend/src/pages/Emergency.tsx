import { useState, useEffect } from 'react';
import { MapPin, Phone, AlertTriangle, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Location {
  lat: number;
  lng: number;
}

interface EmergencyState {
  location: Location | null;
  description: string;
  selectedContacts: string[];
  error: string;
  success: string;
  loading: boolean;
}

function Emergency() {
  const [state, setState] = useState<EmergencyState>({
    location: null,
    description: '',
    selectedContacts: [],
    error: '',
    success: '',
    loading: false
  });

  useEffect(() => {
    // Get location when component mounts
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          }));
          console.log("Location obtained:", position.coords); // Debug log
        },
        (error) => {
          console.error("Error getting location:", error);
          setState(prev => ({ ...prev, error: 'Unable to get your location. Please enable location services.' }));
        }
      );
    } else {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported by your browser' }));
    }
  };

  const handleContactToggle = (contact: string) => {
    setState(prev => ({
      ...prev,
      selectedContacts: prev.selectedContacts.includes(contact)
        ? prev.selectedContacts.filter(c => c !== contact)
        : [...prev.selectedContacts, contact]
    }));
  };

  const handleShareLocation = async () => {
    if (!state.location) {
      setState(prev => ({ ...prev, error: 'Please allow location access' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: '', success: '' }));

    try {
      const token = localStorage.getItem('token');
      console.log("Sending location:", state.location); // Debug log

      const response = await fetch('http://localhost:5000/api/send-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          latitude: state.location.lat,
          longitude: state.location.lng,
          description: state.description
        })
      });

      const data = await response.json();
      console.log("Response:", data); // Debug log

      if (response.ok) {
        setState(prev => ({ ...prev, success: 'Emergency alert sent successfully!', description: '' }));
      } else {
        throw new Error(data.message || 'Failed to send alert');
      }
    } catch (err) {
      console.error('Error:', err);
      setState(prev => ({ ...prev, error: 'Failed to send emergency alert. Please try again.' }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="bg-red-50 min-h-screen py-12">
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
                onClick={getCurrentLocation}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-500 transition-colors"
              >
                <MapPin className="h-5 w-5" />
                <span>Share My Location</span>
              </button>

              {state.location && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Current Location:</p>
                  <p className="font-medium">
                    Lat: {state.location.lat.toFixed(6)}, Lng: {state.location.lng.toFixed(6)}
                  </p>
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Emergency Contacts</h4>
                <div className="space-y-2">
                  {['Family', 'Local Police', 'Emergency Services'].map((contact) => (
                    <label key={contact} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={state.selectedContacts.includes(contact)}
                        onChange={() => handleContactToggle(contact)}
                        className="rounded text-red-600"
                      />
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
                value={state.description}
                onChange={(e) => setState(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your situation (optional)"
                className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />

              <button
                onClick={handleShareLocation}
                disabled={state.loading || !state.location}
                className={`w-full ${
                  state.loading || !state.location 
                    ? 'bg-gray-400' 
                    : 'bg-red-600 hover:bg-red-700'
                } text-white py-3 px-4 rounded-lg transition-colors`}
              >
                {state.loading ? 'Sending...' : 'Send Emergency Alert'}
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
    </div>
  );
}

export default Emergency; 