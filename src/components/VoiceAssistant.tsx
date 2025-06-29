
import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VoiceAssistantProps {
  enabled: boolean;
}

const VoiceAssistant = ({ enabled }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (!enabled) {
      setIsListening(false);
      return;
    }

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const latest = event.results[event.results.length - 1];
        if (latest.isFinal) {
          setTranscript(latest[0].transcript);
          handleVoiceCommand(latest[0].transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      if (isListening) {
        recognition.start();
      }

      return () => recognition.stop();
    }
  }, [isListening, enabled]);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('medicine') || lowerCommand.includes('pill')) {
      speak('Opening medicine reminders');
    } else if (lowerCommand.includes('appointment') || lowerCommand.includes('doctor')) {
      speak('Opening appointments');
    } else if (lowerCommand.includes('family') || lowerCommand.includes('call')) {
      speak('Opening family contacts');
    } else if (lowerCommand.includes('help')) {
      speak('You can say: medicine, appointments, family, or emergency');
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      speak('Voice assistant is now listening');
    } else {
      speak('Voice assistant stopped');
    }
  };

  if (!enabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="p-4 bg-white shadow-xl border-2">
        <div className="flex flex-col items-center space-y-3">
          <Button
            onClick={toggleListening}
            className={`w-16 h-16 rounded-full ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </Button>
          
          <p className="text-sm font-medium text-center">
            {isListening ? '🎤 Listening...' : 'Click to talk'}
          </p>
          
          {transcript && (
            <p className="text-xs text-gray-600 text-center max-w-32">
              "{transcript}"
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
