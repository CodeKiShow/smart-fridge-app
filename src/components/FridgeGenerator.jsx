import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Box, Sun, Sunset, Moon } from 'lucide-react';

const FridgeGenerator = () => {
  const [timeOfDay, setTimeOfDay] = useState('morning');
  
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
        <CardContent className="space-y-6">
          {/* Base component */}
        </CardContent>
      </Card>
    </div>
  );
};

export default FridgeGenerator;