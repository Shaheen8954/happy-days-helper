
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="lg"
      className="text-xl px-6 py-3 bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm"
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-6 h-6 mr-2" />
          Night
        </>
      ) : (
        <>
          <Sun className="w-6 h-6 mr-2" />
          Day
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
