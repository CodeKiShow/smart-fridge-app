import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Box, Sun, Sunset, Moon } from 'lucide-react';
import AIAssistant from './AIAssistant';
import RecipeManager from './RecipeManager';
import ScannerModule from './ScannerModule';
import InventoryManager from './InventoryManager';
import ShoppingList from './ShoppingList';
import EcoModule from './EcoModule';
import FamilyManager from './FamilyManager';

const FridgeGenerator = () => {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [language, setLanguage] = useState('fr');
  const [ingredients, setIngredients] = useState([]);
  const [activeModule, setActiveModule] = useState('inventory');

  const getBackgroundColor = () => {
    const colors = {
      morning: 'bg-yellow-50',
      afternoon: 'bg-blue-50',
      evening: 'bg-indigo-100',
    };
    return colors[timeOfDay] || 'bg-gray-50';
  };

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) setTimeOfDay('morning');
      else if (hour >= 12 && hour < 18) setTimeOfDay('afternoon');
      else setTimeOfDay('evening');
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case 'scanner':
        return <ScannerModule onScan={(items) => setIngredients([...ingredients, ...items])} />;
      case 'ai':
        return <AIAssistant ingredients={ingredients} />;
      case 'recipes':
        return <RecipeManager ingredients={ingredients} />;
      case 'inventory':
        return <InventoryManager ingredients={ingredients} setIngredients={setIngredients} />;
      case 'shopping':
        return <ShoppingList ingredients={ingredients} />;
      case 'eco':
        return <EcoModule ingredients={ingredients} />;
      case 'family':
        return <FamilyManager />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen p-4 ${getBackgroundColor()}`}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Smart Fridge App</h1>
            <Button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}>
              {language.toUpperCase()}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 overflow-x-auto p-2">
            {[
              { id: 'scanner', label: 'Scanner' },
              { id: 'inventory', label: 'Inventaire' },
              { id: 'ai', label: 'Assistant IA' },
              { id: 'recipes', label: 'Recettes' },
              { id: 'shopping', label: 'Courses' },
              { id: 'eco', label: 'Écologie' },
              { id: 'family', label: 'Famille' }
            ].map(module => (
              <Button
                key={module.id}
                variant={activeModule === module.id ? 'default' : 'outline'}
                onClick={() => setActiveModule(module.id)}
              >
                {module.label}
              </Button>
            ))}
          </div>
          <div className="mt-4">
            {renderModule()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FridgeGenerator;