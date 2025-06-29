
import { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const EmergencyButton = () => {
  const [showEmergency, setShowEmergency] = useState(false);

  const handleEmergencyCall = (number: string, service: string) => {
    // In a real app, this would make an actual emergency call
    alert(`Calling ${service} at ${number}`);
    setShowEmergency(false);
  };

  return (
    <>
      <Button
        onClick={() => setShowEmergency(true)}
        size="lg"
        className="bg-red-600 hover:bg-red-700 text-white text-xl px-6 py-3 border-2 border-red-700"
      >
        🚨 Emergency
      </Button>

      {showEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-8 max-w-md w-full mx-4 border-4 border-red-500">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-red-600 mb-6">
                🚨 Emergency
              </h2>
              
              <div className="space-y-4">
                <Button
                  onClick={() => handleEmergencyCall('911', 'Emergency Services')}
                  size="lg"
                  className="w-full text-2xl py-6 bg-red-600 hover:bg-red-700"
                >
                  <Phone className="w-8 h-8 mr-3" />
                  Call 911
                </Button>
                
                <Button
                  onClick={() => handleEmergencyCall('(555) 234-5678', 'Sarah (Daughter)')}
                  size="lg"
                  variant="outline"
                  className="w-full text-xl py-4 border-2"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  Call Sarah
                </Button>
                
                <Button
                  onClick={() => handleEmergencyCall('(555) 987-6543', 'Family Doctor')}
                  size="lg"
                  variant="outline"
                  className="w-full text-xl py-4 border-2"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  Call Doctor
                </Button>
              </div>
              
              <Button
                onClick={() => setShowEmergency(false)}
                variant="ghost"
                className="w-full text-xl py-3 mt-6"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default EmergencyButton;
