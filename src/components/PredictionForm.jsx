import React, { useState } from 'react';

const PredictionForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        Age: '',
        Sex: '',
        ChestPainType: '',
        RestingBP: '',
        Cholesterol: '',
        FastingBS: '',
        RestingECG: '',
        MaxHR: '',
        ExerciseAngina: '',
        Oldpeak: '',
        ST_Slope: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert numeric strings to numbers
        const processedData = {
            ...formData,
            Age: parseFloat(formData.Age),
            RestingBP: parseFloat(formData.RestingBP),
            Cholesterol: parseFloat(formData.Cholesterol),
            FastingBS: parseFloat(formData.FastingBS), // FastingBS is 0 or 1, but technically numeric in some datasets
            MaxHR: parseFloat(formData.MaxHR),
            Oldpeak: parseFloat(formData.Oldpeak)
        };
        onSubmit(processedData);
    };

    return (
        <form onSubmit={handleSubmit} className="animate-fade-in-up">
            <div className="form-grid">
                {/* Age */}
                <div className="form-group">
                    <label htmlFor="Age">Age</label>
                    <input
                        type="number"
                        id="Age"
                        name="Age"
                        placeholder="e.g., 45"
                        required
                        min="1"
                        max="120"
                        value={formData.Age}
                        onChange={handleChange}
                    />
                </div>

                {/* Sex */}
                <div className="form-group">
                    <label htmlFor="Sex">Sex</label>
                    <select id="Sex" name="Sex" required value={formData.Sex} onChange={handleChange}>
                        <option value="" disabled>Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>

                {/* Chest Pain Type */}
                <div className="form-group">
                    <label htmlFor="ChestPainType">Chest Pain Type</label>
                    <select id="ChestPainType" name="ChestPainType" required value={formData.ChestPainType} onChange={handleChange}>
                        <option value="" disabled>Select Type</option>
                        <option value="TA">Typical Angina (TA)</option>
                        <option value="ATA">Atypical Angina (ATA)</option>
                        <option value="NAP">Non-Anginal Pain (NAP)</option>
                        <option value="ASY">Asymptomatic (ASY)</option>
                    </select>
                </div>

                {/* Resting BP */}
                <div className="form-group">
                    <label htmlFor="RestingBP">Resting BP (mm Hg)</label>
                    <input
                        type="number"
                        id="RestingBP"
                        name="RestingBP"
                        placeholder="e.g., 120"
                        required
                        value={formData.RestingBP}
                        onChange={handleChange}
                    />
                </div>

                {/* Cholesterol */}
                <div className="form-group">
                    <label htmlFor="Cholesterol">Cholesterol (mm/dl)</label>
                    <input
                        type="number"
                        id="Cholesterol"
                        name="Cholesterol"
                        placeholder="e.g., 200"
                        required
                        value={formData.Cholesterol}
                        onChange={handleChange}
                    />
                </div>

                {/* Fasting BS */}
                <div className="form-group">
                    <label htmlFor="FastingBS">Fasting Blood Sugar</label>
                    <select id="FastingBS" name="FastingBS" required value={formData.FastingBS} onChange={handleChange}>
                        <option value="" disabled>Select Level</option>
                        <option value="0">Normal (&lt; 120 mg/dl)</option>
                        <option value="1">High (&gt; 120 mg/dl)</option>
                    </select>
                </div>

                {/* Resting ECG */}
                <div className="form-group">
                    <label htmlFor="RestingECG">Resting ECG</label>
                    <select id="RestingECG" name="RestingECG" required value={formData.RestingECG} onChange={handleChange}>
                        <option value="" disabled>Select Result</option>
                        <option value="Normal">Normal</option>
                        <option value="ST">ST-T Wave Abnormality</option>
                        <option value="LVH">Left Ventricular Hypertrophy</option>
                    </select>
                </div>

                {/* Max HR */}
                <div className="form-group">
                    <label htmlFor="MaxHR">Max Heart Rate</label>
                    <input
                        type="number"
                        id="MaxHR"
                        name="MaxHR"
                        placeholder="e.g., 150"
                        required
                        value={formData.MaxHR}
                        onChange={handleChange}
                    />
                </div>

                {/* Exercise Angina */}
                <div className="form-group">
                    <label htmlFor="ExerciseAngina">Exercise Induced Angina</label>
                    <select id="ExerciseAngina" name="ExerciseAngina" required value={formData.ExerciseAngina} onChange={handleChange}>
                        <option value="" disabled>Select Option</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                    </select>
                </div>

                {/* Oldpeak */}
                <div className="form-group">
                    <label htmlFor="Oldpeak">Oldpeak (Depression)</label>
                    <input
                        type="number"
                        id="Oldpeak"
                        name="Oldpeak"
                        placeholder="e.g., 1.5"
                        step="0.1"
                        required
                        value={formData.Oldpeak}
                        onChange={handleChange}
                    />
                </div>

                {/* ST Slope */}
                <div className="form-group full-width">
                    <label htmlFor="ST_Slope">ST Slope</label>
                    <select id="ST_Slope" name="ST_Slope" required value={formData.ST_Slope} onChange={handleChange}>
                        <option value="" disabled>Select Slope</option>
                        <option value="Up">Upsloping</option>
                        <option value="Flat">Flat</option>
                        <option value="Down">Downsloping</option>
                    </select>
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            Analyzing...
                            <div className="loader"></div>
                        </>
                    ) : (
                        'Analyze Risk'
                    )}
                </button>
            </div>
        </form>
    );
};

export default PredictionForm;
