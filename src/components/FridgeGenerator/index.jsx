import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  // Base states
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [language, setLanguage] = useState('fr');
  const [ingredients, setIngredients] = useState([]);
  const [activeModule, setActiveModule] = useState('inventory');

  // Utility functions
  const getBackgroundColor = () => {
    const colors = {
      morning: 'bg-yellow-50',
      afternoon: 'bg-blue-50',
      evening: 'bg-indigo-100',
    };
    return colors[timeOfDay] || 'bg-gray-50';
  };

  const getTimeIcon = () => {
    const icons = {
      morning: <Sun className="w-6 h-6 text-yellow-500" />,
      afternoon: <Sunset className="w-6 h-6 text-orange-500" />,
      evening: <Moon className="w-6 h-6 text-indigo-500" />
    };
    return icons[timeOfDay];
  };

  // Time update effect
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

  // Module selection
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'scan':
        return <ScannerModule onScan={(items) => setIngredients([...ingredients, ...items])} />;
      case 'ai':
        return <AIAssistant ingredients={ingredients} />;
      case 'recipes':
        return <RecipeManager ingredients={ingredients} timeOfDay={timeOfDay} />;
      case 'inventory':
        return <InventoryManager ingredients={ingredients} setIngredients={setIngredients} />;
      case 'shopping':
        return <ShoppingList ingredients={ingredients} />;
      case 'eco':
        return <EcoModule ingredients={ingredients} />;
      case 'family':
        return <FamilyManager />;
      default:
        return <InventoryManager ingredients={ingredients} setIngredients={setIngredients} />;
    }
  };

  return (
    <div className={`min-h-screen p-4 ${getBackgroundColor()}`}>
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Box className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Mon Frigo Intelligent</h1>
          </div>
          {getTimeIcon()}
        </CardHeader>

        {/* Module Navigation */}
        <div className="flex gap-2 p-4 overflow-x-auto">
          <Button 
            variant={activeModule === 'inventory' ? 'default' : 'outline'}
            onClick={() => setActiveModule('inventory')}
          >
            Inventaire
          </Button>
          <Button 
            variant={activeModule === 'scan' ? 'default' : 'outline'}
            onClick={() => setActiveModule('scan')}
          >
            Scanner
          </Button>
          <Button 
            variant={activeModule === 'ai' ? 'default' : 'outline'}
            onClick={() => setActiveModule('ai')}
          >
            Assistant IA
          </Button>
          <Button 
            variant={activeModule === 'recipes' ? 'default' : 'outline'}
            onClick={() => setActiveModule('recipes')}
          >
            Recettes
          </Button>
          <Button 
            variant={activeModule === 'shopping' ? 'default' : 'outline'}
            onClick={() => setActiveModule('shopping')}
          >
            Courses
          </Button>
          <Button 
            variant={activeModule === 'eco' ? 'default' : 'outline'}
            onClick={() => setActiveModule('eco')}
          >
            Écologie
          </Button>
          <Button 
            variant={activeModule === 'family' ? 'default' : 'outline'}
            onClick={() => setActiveModule('family')}
          >
            Famille
          </Button>
        </div>

        <CardContent className="space-y-6">
          {renderActiveModule()}
        </CardContent>
      </Card>
    </div>
  );
};

export default FridgeGenerator;