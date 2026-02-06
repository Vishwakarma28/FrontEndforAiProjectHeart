import React from 'react';

const ResultCard = ({ result, onReset }) => {
    // result is expected to be 0 or 1 (or string "0"/"1")
    const isRisk = String(result) === '1';

    return (
        <div className="result-container">
            <div className="result-card glass-panel">
                <div className="result-icon">
                    {isRisk ? '⚠️' : '💚'}
                </div>

                <h2 style={{ color: isRisk ? 'var(--danger-color)' : 'var(--success-color)' }}>
                    {isRisk ? 'High Possibility of Heart Disease' : 'Low Possibility of Heart Disease'}
                </h2>

                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    {isRisk
                        ? 'The model predicts a high risk based on the provided clinical parameters. Please consult a cardiologist for a thorough medical examination.'
                        : 'The model predicts a low risk. However, maintain a healthy lifestyle and continue regular check-ups.'
                    }
                </p>

                <button onClick={onReset} className="reset-btn">
                    Analyze Another Patient
                </button>
            </div>
        </div>
    );
};

export default ResultCard;
