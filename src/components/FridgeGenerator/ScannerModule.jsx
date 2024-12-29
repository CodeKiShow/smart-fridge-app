import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Check, X } from 'lucide-react';

const ScannerModule = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([]);
  const [confirmationMode, setConfirmationMode] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      const detectedItems = [
        { name: 'Tomates', confidence: 0.95, expiry: '2024-12-25' },
        { name: 'Lait', confidence: 0.88, expiry: '2024-12-24' },
        { name: 'Oeufs', confidence: 0.92, expiry: '2024-12-28' }
      ];
      setResults(detectedItems);
      setScanning(false);
      setConfirmationMode(true);
    }, 1500);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setScanning(true);
      setTimeout(() => {
        const detectedItems = [
          { name: 'Pommes', confidence: 0.91, expiry: '2024-12-26' },
          { name: 'Yaourt', confidence: 0.87, expiry: '2024-12-23' }
        ];
        setResults(detectedItems);
        setScanning(false);
        setConfirmationMode(true);
      }, 1500);
    }
  };

  const confirmResults = () => {
    onScan(results.map(item => item.name));
    setResults([]);
    setConfirmationMode(false);
  };

  const cancelResults = () => {
    setResults([]);
    setConfirmationMode(false);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gray-50">
        <div className="text-center space-y-4">
          {!scanning && !confirmationMode && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <Camera className="w-12 h-12 text-blue-500" />
                <h2 className="text-xl font-semibold">Scanner vos aliments</h2>
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={handleScan}
                  className="flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Scanner maintenant
                </Button>
                <label>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    <Upload className="w-4 h-4" />
                    Charger une photo
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          )}

          {scanning && (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-pulse">
                <Camera className="w-12 h-12 text-blue-500" />
              </div>
              <p>Analyse en cours...</p>
            </div>
          )}

          {confirmationMode && results.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Éléments détectés</h3>
              <div className="divide-y">
                {results.map((item, index) => (
                  <div key={index} className="py-2 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Confiance: {Math.round(item.confidence * 100)}%
                      </p>
                    </div>
                    <p className="text-sm">
                      Exp: {new Date(item.expiry).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  onClick={confirmResults}
                  className="flex items-center gap-2"
                  variant="default"
                >
                  <Check className="w-4 h-4" />
                  Confirmer
                </Button>
                <Button
                  onClick={cancelResults}
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  <X className="w-4 h-4" />
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ScannerModule;