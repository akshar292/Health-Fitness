from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import pickle
import numpy as np

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML Model
model = pickle.load(open("health_fitness.pkl", "rb"))

# Serve React Build Files
app.mount(
    "/assets",
    StaticFiles(directory="fitness-react-ui/dist/assets"),
    name="assets"
)

# Input Schema
class HealthData(BaseModel):
    exercise_minutes: float
    steps: float
    food_calories: float
    sleep_hours: float
    water_intake_liters: float

# Health Check Route
@app.get("/health")
def health():
    return {
        "status": "Backend Running Successfully"
    }

# Serve React Frontend
@app.get("/")
def serve_react():
    return FileResponse("fitness-react-ui/dist/index.html")

# Prediction API
@app.post("/predict")
def predict(data: HealthData):

    features = np.array([[
        data.exercise_minutes,
        data.steps,
        data.food_calories,
        data.sleep_hours,
        data.water_intake_liters
    ]])

    prediction = model.predict(features)

    return {
        "predicted_weight": round(float(prediction[0]), 2)
    }