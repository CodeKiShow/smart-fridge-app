import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Utensils, Clock, Search, Filter, ChefHat, Star, Heart } from 'lucide-react';

const RecipeManager = ({ ingredients = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const allRecipes = [
    {
      id: 1,
      name: 'Pasta Primavera',
      difficulty: 'facile',
      time: '30',
      type: 'végétarien',
      ingredients: ['pâtes', 'tomates', 'courgettes', 'oignons'],
      steps: ['Faire bouillir les pâtes', 'Couper les légumes', 'Mélanger le tout'],
      rating: 4.8,
      image: '/api/placeholder/400/300'
    }
  ];

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, selectedDifficulty]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher une recette..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtres
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeManager;