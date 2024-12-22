import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, AlertTriangle, Utensils, Leaf, Clock } from 'lucide-react';

const AIAssistant = ({ ingredients = [] }) => {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeIngredients = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const aiAnalysis = {
        suggestions: [
          {
            type: 'urgent',
            message: 'Les tomates expirent dans 2 jours',
            action: 'Utilisez-les dans une salade ou une sauce'
          },
          {
            type: 'eco',
            message: 'Combinez oignons et poivrons pour éviter le gaspillage',
            action: 'Préparez une ratatouille'
          }
        ],
        recipes: [
          {
            name: 'Pasta Primavera',
            difficulty: 'Facile',
            time: '30 min',
            score: 95
          },
          {
            name: 'Buddha Bowl Végétarien',
            difficulty: 'Moyen',
            time: '25 min',
            score: 88
          }
        ],
        nutritionTips: [
          'Ajoutez des protéines à votre prochain repas',
          'Pensez à varier les légumes verts'
        ]
      };
      setAnalysis(aiAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const hasIngredients = ingredients && ingredients.length > 0;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-purple-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Assistant IA</h2>
          </div>
          {!hasIngredients ? (
            <p className="text-sm text-gray-500">Ajoutez des ingrédients pour commencer l'analyse</p>
          ) : (
            <Button 
              onClick={analyzeIngredients}
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Analyser {ingredients.length} ingrédient{ingredients.length > 1 ? 's' : ''}
            </Button>
          )}
        </div>

        {isAnalyzing && (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="animate-pulse">
              <Brain className="w-12 h-12 text-purple-500" />
            </div>
            <p>Analyse en cours de vos ingrédients...</p>
          </div>
        )}

        {analysis && !isAnalyzing && (
          <div className="space-y-6">
            <div className="bg-orange-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h3 className="font-medium">Actions prioritaires</h3>
              </div>
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex justify-between items-start">
                    <span className="text-sm">{suggestion.message}</span>
                    <span className="text-xs text-orange-600">{suggestion.action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Utensils className="w-5 h-5 text-green-600" />
                <h3 className="font-medium">Recettes recommandées</h3>
              </div>
              <div className="grid gap-3">
                {analysis.recipes.map((recipe, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{recipe.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.time}</span>
                        <span>•</span>
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">
                      {recipe.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">Conseils nutritionnels</h3>
              </div>
              <ul className="space-y-2">
                {analysis.nutritionTips.map((tip, index) => (
                  <li key={index} className="text-sm">• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!hasIngredients && !analysis && !isAnalyzing && (
          <div className="text-center py-8 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Commencez par ajouter des ingrédients à votre frigo</p>
            <p className="text-sm mt-2">L'IA vous aidera à optimiser leur utilisation</p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <h4 className="font-medium mb-1">Gaspillage évité</h4>
          <p className="text-2xl font-bold text-purple-600">85%</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <h4 className="font-medium mb-1">Recettes suggérées</h4>
          <p className="text-2xl font-bold text-purple-600">24</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <h4 className="font-medium mb-1">Score nutritionnel</h4>
          <p className="text-2xl font-bold text-purple-600">A+</p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;