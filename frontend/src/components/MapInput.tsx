import React from 'react';
import Button from './ui/Button';

interface MapInputProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  selectedLocation: { lat: number; lng: number } | null;
  onOpenModal: () => void;
}

const MapInput: React.FC<MapInputProps> = ({ selectedLocation, onOpenModal }) => {
  // NOTE: This key is intentionally left as a placeholder.
  // The app will not function correctly until it's replaced in index.html.
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; 
  const defaultLocation = { lat: 28.6139, lng: 77.2090 }; // Delhi, India
  const location = selectedLocation || defaultLocation;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">Pin Delivery Location</label>
      <div className="relative w-full h-48 rounded-lg overflow-hidden border">
        {apiKey.includes('YOUR_') ? (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-center p-4 text-slate-600">
                Please add a valid Google Maps API Key in `frontend/index.html` to enable map functionality.
            </div>
        ) : (
            <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${location.lat},${location.lng}&zoom=15`}
            ></iframe>
        )}
      </div>
       <Button type="button" variant="secondary" onClick={onOpenModal}>
        {selectedLocation ? 'Change Pinned Location' : 'Pin Location on Map'}
      </Button>
       {selectedLocation && (
        <p className="text-xs text-green-700">
          Location Pinned: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
};

export default MapInput;