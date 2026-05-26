import React, { useState } from "react";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    exercise_minutes: "",
    steps: "",
    food_calories: "",
    sleep_hours: "",
    water_intake_liters: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        exercise_minutes: Number(formData.exercise_minutes),
        steps: Number(formData.steps),
        food_calories: Number(formData.food_calories),
        sleep_hours: Number(formData.sleep_hours),
        water_intake_liters: Number(formData.water_intake_liters),
      }),
    });

    const data = await response.json();

    setPrediction(data.predicted_weight);
  };

  return (
    <div className="container">

      <div className="glass-card">

        <div className="header">
          <h1>Health & Fitness Predictor</h1>

          <p>
            Predict your estimated weight
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid">

            <div className="input-group">
              <label>Exercise Minutes</label>

              <input
                type="number"
                name="exercise_minutes"
                value={formData.exercise_minutes}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Steps</label>

              <input
                type="number"
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Food Calories</label>

              <input
                type="number"
                name="food_calories"
                value={formData.food_calories}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Sleep Hours</label>

              <input
                type="number"
                name="sleep_hours"
                value={formData.sleep_hours}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Water Intake</label>

              <input
                type="number"
                name="water_intake_liters"
                value={formData.water_intake_liters}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <button className="predict-btn">
            Predict Weight
          </button>

        </form>

        {prediction && (

          <div className="result-card">

            <h2>Predicted Weight</h2>

            <div className="prediction">
              {prediction.toFixed(2)} kg
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;