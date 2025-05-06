from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from firebase_service import fetch_health_data
from database import db
from ml_model import model
from gemini_api import gemini

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model for user data
class UserInput(BaseModel):
    heartRate: float
    steps: int
    calories: float

@app.post("/predict")
async def predict(input: UserInput):
    # Calculate risk score
    risk_score = model.predict_risk(input.heartRate, input.steps, input.calories)
    
    # Generate recommendation
    recommendation = gemini.generate_recommendation(input.heartRate, input.steps, input.calories, risk_score)
    
    # Store in database
    db.insert_data(input.heartRate, input.steps, input.calories, risk_score)
    
    return {
        "heart_rate": input.heartRate,
        "steps": input.steps,
        "calories": input.calories,
        "risk_score": risk_score,
        "recommendation": recommendation
    }

@app.get("/data")
async def get_data():
    return fetch_health_data("va0La5sbKyah17KJUNqbm2bJC3N2")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)