from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import db
from ml_model import model
from gemini_api import gemini

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model for user data
class UserInput(BaseModel):
    heart_rate: float
    steps: int
    sleep_hours: float

@app.post("/predict")
async def predict(input: UserInput):
    # Calculate risk score
    risk_score = model.predict_risk(input.heart_rate, input.steps, input.sleep_hours)
    
    # Generate recommendation
    recommendation = gemini.generate_recommendation(input.heart_rate, input.steps, input.sleep_hours, risk_score)
    
    # Store in database
    db.insert_data(input.heart_rate, input.steps, input.sleep_hours, risk_score)
    
    return {
        "heart_rate": input.heart_rate,
        "steps": input.steps,
        "sleep_hours": input.sleep_hours,
        "risk_score": risk_score,
        "recommendation": recommendation
    }

@app.get("/data")
async def get_data():
    return db.fetch_recent_data()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)