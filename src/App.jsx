import React, { useState } from 'react';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';

function App() {
  const [prediction, setPrediction] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePrediction = async (data) => {
    setIsLoading(true);
    setError(null);

    console.log("Sending data:", data);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();

      // Determine the prediction value
      let predictionValue = null;
      if (typeof result === 'object' && result !== null && 'prediction' in result) {
        predictionValue = result.prediction;
      } else if (Array.isArray(result)) {
        predictionValue = result[0];
      } else {
        predictionValue = result;
      }

      // Simulate small delay for UX
      setTimeout(() => {
        setPrediction(predictionValue);
        setIsLoading(false);
      }, 500);

    } catch (err) {
      console.error(err);
      setError("Failed to connect to the prediction API. Ensure backend is running.");
      setIsLoading(false);
    }
  };

  const resetPrediction = () => {
    setPrediction(null);
    setError(null);
  };

  return (
    <>
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container">
        <header className="header animate-fade-in-down">
          <h1>HeartGuard <span className="highlight">AI</span></h1>
          <p>Advanced Machine Learning Heart Disease Analysis</p>
        </header>

        <main>
          {prediction !== null ? (
            <ResultCard result={prediction} onReset={resetPrediction} />
          ) : (
            <div className="glass-panel">
              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  border: '1px solid var(--danger-color)',
                  color: '#fca5a5'
                }}>
                  {error}
                </div>
              )}
              <PredictionForm onSubmit={handlePrediction} isLoading={isLoading} />
            </div>
          )}
        </main>

        <footer className="footer">
          <p>&copy; 2026 HeartGuard AI System. Confidential Medical Tool.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
