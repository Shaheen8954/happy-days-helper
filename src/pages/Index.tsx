
import { useState } from 'react';
import { Home, Calendar, Pill, Heart, Users, Volume2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BeamsBackground } from '@/components/ui/beams-background';
import { NavBar } from '@/components/ui/tubelight-navbar';
import VoiceAssistant from '@/components/VoiceAssistant';
import MedicineReminders from '@/components/MedicineReminders';
import AppointmentBooking from '@/components/AppointmentBooking';
import FamilyContacts from '@/components/FamilyContacts';
import HealthTips from '@/components/HealthTips';
import EmergencyButton from '@/components/EmergencyButton';
import ThemeToggle from '@/components/ThemeToggle';

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

  const navItems = [
    {
      name: 'Home',
      onClick: () => handleNavigation('home', 'Home'),
      icon: Home,
      isActive: currentView === 'home'
    },
    {
      name: 'Medicine',
      onClick: () => handleNavigation('medicine', 'Medicine Reminders'),
      icon: Pill,
      isActive: currentView === 'medicine'
    },
    {
      name: 'Appointments',
      onClick: () => handleNavigation('appointments', 'Appointments'),
      icon: Calendar,
      isActive: currentView === 'appointments'
    },
    {
      name: 'Family',
      onClick: () => handleNavigation('family', 'Family Contacts'),
      icon: Users,
      isActive: currentView === 'family'
    },
    {
      name: 'Health Tips',
      onClick: () => handleNavigation('health', 'Health Tips'),
      icon: Heart,
      isActive: currentView === 'health'
    }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'medicine':
        return <MedicineReminders />;
      case 'appointments':
        return <AppointmentBooking />;
      case 'family':
        return <FamilyContacts />;
      case 'health':
        return <HealthTips />;
      default:
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold text-white dark:text-white mb-4">
                Your Digital Helper
              </h1>
              <p className="text-3xl text-white/80 dark:text-white/70 font-medium">
                Everything you need, made simple
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card 
                className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/10"
                onClick={() => handleNavigation('medicine', 'Medicine Reminders')}
              >
                <div className="text-center">
                  <Pill className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-2">Medicine</h2>
                  <p className="text-xl text-white/70">Never forget your pills</p>
                </div>
              </Card>

              <Card 
                className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/10"
                onClick={() => handleNavigation('appointments', 'Appointments')}
              >
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-2">Appointments</h2>
                  <p className="text-xl text-white/70">Book doctor visits</p>
                </div>
              </Card>

              <Card 
                className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/10"
                onClick={() => handleNavigation('family', 'Family Contacts')}
              >
                <div className="text-center">
                  <Users className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-2">Family</h2>
                  <p className="text-xl text-white/70">Call your loved ones</p>
                </div>
              </Card>

              <Card 
                className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/10"
                onClick={() => handleNavigation('health', 'Health Tips')}
              >
                <div className="text-center">
                  <Heart className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-2">Health Tips</h2>
                  <p className="text-xl text-white/70">Daily wellness advice</p>
                </div>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <BeamsBackground intensity="medium">
      {/* Tubelight Navigation */}
      <NavBar items={navItems} />

      {/* Secondary Header */}
      <header className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border-b border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {currentView !== 'home' && (
                <Button
                  onClick={() => handleNavigation('home', 'Home')}
                  variant="ghost"
                  className="text-2xl font-bold text-white hover:bg-white/20 px-6 py-3"
                >
                  <ArrowLeft className="w-8 h-8 mr-2" />
                  Back
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                variant={voiceEnabled ? "default" : "outline"}
                size="lg"
                className="text-xl px-6 py-3 bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm"
              >
                <Volume2 className="w-6 h-6 mr-2" />
                Voice {voiceEnabled ? 'ON' : 'OFF'}
              </Button>
              
              <ThemeToggle />
              
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
    </BeamsBackground>
  );
};

export default Index;
