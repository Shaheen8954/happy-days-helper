
import { useState } from 'react';
import { Phone, Calendar, Pill, Heart, Users, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import VoiceAssistant from '@/components/VoiceAssistant';
import MedicineReminders from '@/components/MedicineReminders';
import AppointmentBooking from '@/components/AppointmentBooking';
import FamilyContacts from '@/components/FamilyContacts';
import EmergencyButton from '@/components/EmergencyButton';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const handleNavigation = (view: string, label: string) => {
    setCurrentView(view);
    if (voiceEnabled) {
      speak(`Opening ${label}`);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'medicine':
        return <MedicineReminders />;
      case 'appointments':
        return <AppointmentBooking />;
      case 'family':
        return <FamilyContacts />;
      default:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold text-blue-900 mb-4">
                Your Digital Helper
              </h1>
              <p className="text-3xl text-gray-700 font-medium">
                Everything you need, made simple
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card 
                className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200"
                onClick={() => handleNavigation('medicine', 'Medicine Reminders')}
              >
                <div className="text-center">
                  <Pill className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">Medicine</h2>
                  <p className="text-xl text-gray-700">Never forget your pills</p>
                </div>
              </Card>

              <Card 
                className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200"
                onClick={() => handleNavigation('appointments', 'Appointments')}
              >
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-green-900 mb-2">Appointments</h2>
                  <p className="text-xl text-gray-700">Book doctor visits</p>
                </div>
              </Card>

              <Card 
                className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200"
                onClick={() => handleNavigation('family', 'Family Contacts')}
              >
                <div className="text-center">
                  <Users className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-purple-900 mb-2">Family</h2>
                  <p className="text-xl text-gray-700">Call your loved ones</p>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-orange-900 mb-2">Health Tips</h2>
                  <p className="text-xl text-gray-700">Daily wellness advice</p>
                </div>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Button
              onClick={() => handleNavigation('home', 'Home')}
              variant="ghost"
              className="text-2xl font-bold text-blue-900 hover:bg-blue-50 px-6 py-3"
            >
              🏠 Home
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                variant={voiceEnabled ? "default" : "outline"}
                size="lg"
                className="text-xl px-6 py-3"
              >
                <Volume2 className="w-6 h-6 mr-2" />
                Voice {voiceEnabled ? 'ON' : 'OFF'}
              </Button>
              
              <EmergencyButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {renderCurrentView()}
      </main>

      {/* Voice Assistant */}
      <VoiceAssistant enabled={voiceEnabled} />
    </div>
  );
};

export default Index;
