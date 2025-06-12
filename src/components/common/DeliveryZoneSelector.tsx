import React from 'react';
import { Truck, MapPin } from 'lucide-react';
import { DeliveryZone } from '../../types';
import { deliveryZones } from '../../data/deliveryZones';

interface DeliveryZoneSelectorProps {
  selectedZone: DeliveryZone | null;
  onZoneSelect: (zone: DeliveryZone) => void;
  userCity?: string;
}

const DeliveryZoneSelector: React.FC<DeliveryZoneSelectorProps> = ({
  selectedZone,
  onZoneSelect,
  userCity
}) => {
  const activeZones = deliveryZones.filter(zone => zone.isActive);
  
  // Suggest zone based on user city
  const suggestedZone = userCity 
    ? activeZones.find(zone => 
        zone.cities.some(city => 
          city.toLowerCase().includes(userCity.toLowerCase())
        )
      )
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Truck className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Zone de Livraison</h3>
      </div>
      
      {suggestedZone && !selectedZone && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700 mb-2">
            Zone suggérée pour {userCity} :
          </p>
          <button
            onClick={() => onZoneSelect(suggestedZone)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Sélectionner {suggestedZone.name}
          </button>
        </div>
      )}
      
      <div className="space-y-3">
        {activeZones.map((zone) => (
          <div
            key={zone.id}
            onClick={() => onZoneSelect(zone)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedZone?.id === zone.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                  <h4 className="font-medium text-gray-900">{zone.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Villes: {zone.cities.join(', ')}
                </p>
                <p className="text-sm text-gray-500">
                  Délai: {zone.estimatedDeliveryTime}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-blue-600">
                  {zone.deliveryFee.toLocaleString()} FCFA
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <p className="text-xs text-gray-600">
          * Les délais de livraison sont estimatifs et peuvent varier selon les conditions.
        </p>
      </div>
    </div>
  );
};

export default DeliveryZoneSelector;