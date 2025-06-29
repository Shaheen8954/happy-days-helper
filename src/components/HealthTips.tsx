
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, RefreshCw } from 'lucide-react';

const healthTips = [
  "Drink at least 8 glasses of water daily to stay hydrated and maintain good health.",
  "Take a 10-minute walk after meals to aid digestion and improve blood sugar levels.",
  "Get 7-9 hours of quality sleep each night to boost your immune system and mental health.",
  "Eat a variety of colorful fruits and vegetables to get essential vitamins and minerals.",
  "Practice deep breathing exercises for 5 minutes daily to reduce stress and anxiety.",
  "Limit screen time before bed to improve sleep quality and reduce eye strain.",
  "Wash your hands frequently with soap and water for at least 20 seconds.",
  "Stand up and stretch every hour if you work at a desk to prevent muscle stiffness.",
  "Include lean proteins like fish, chicken, and beans in your daily meals.",
  "Practice gratitude by writing down three things you're thankful for each day.",
  "Limit processed foods and choose whole, natural foods whenever possible.",
  "Stay connected with friends and family to maintain good mental health.",
  "Exercise for at least 30 minutes, 5 days a week to keep your heart healthy.",
  "Protect your skin by wearing sunscreen with at least SPF 30 when outdoors.",
  "Take regular breaks from work to prevent burnout and maintain productivity.",
  "Brush your teeth twice daily and floss regularly for good oral health.",
  "Practice mindfulness or meditation to reduce stress and improve focus.",
  "Eat smaller, more frequent meals to maintain steady energy levels throughout the day.",
  "Keep a first aid kit at home and know basic first aid procedures.",
  "Schedule regular check-ups with your doctor for preventive healthcare."
];

const HealthTips = () => {
  const [currentTip, setCurrentTip] = useState('');

  const generateRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * healthTips.length);
    setCurrentTip(healthTips[randomIndex]);
  };

  useEffect(() => {
    // Generate a random tip when component mounts
    generateRandomTip();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white dark:text-white mb-4">
          Daily Health Tips
        </h1>
        <p className="text-2xl text-white/80 dark:text-white/70">
          Your daily dose of wellness wisdom
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-white/10 dark:bg-white/5 border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center text-3xl text-white mb-4">
              <Heart className="w-10 h-10 text-red-400 mr-3" />
              Today's Health Tip
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <p className="text-xl text-white/90 leading-relaxed font-medium">
                {currentTip}
              </p>
            </div>
            
            <Button
              onClick={generateRandomTip}
              size="lg"
              className="text-xl px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              <RefreshCw className="w-6 h-6 mr-2" />
              Get New Tip
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-4xl mb-2">💧</div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Hydrated</h3>
              <p className="text-white/70">Drink plenty of water throughout the day</p>
            </div>
          </Card>

          <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-4xl mb-2">🏃‍♂️</div>
              <h3 className="text-xl font-bold text-white mb-2">Stay Active</h3>
              <p className="text-white/70">Regular exercise keeps you healthy</p>
            </div>
          </Card>

          <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-4xl mb-2">🥗</div>
              <h3 className="text-xl font-bold text-white mb-2">Eat Well</h3>
              <p className="text-white/70">Choose nutritious, balanced meals</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;
