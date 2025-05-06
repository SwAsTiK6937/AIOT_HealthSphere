import { toast } from 'sonner';

export interface PredictionResult {
  heart_rate: number;
  steps: number;
  calories: number;
  risk_score: number;
  recommendation: string;
}

export interface HealthData {
  heart_rate: number;
  steps: number;
  calories: number;
}

// Function to get health data from the API
export const getHealthData = async (): Promise<HealthData | null> => {
  try {
    const response = await fetch('http://localhost:8000/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Health data:', data);
    return data as HealthData;
  } catch (error) {
    console.error('Failed to get health data:', error);
    toast.error('Failed to fetch health data');
    return null;
  }
};

// Function to get prediction from the API
export const getPrediction = async (healthData: HealthData): Promise<PredictionResult | null> => {
  try {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(healthData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Prediction result:', data);
    return data as PredictionResult;
  } catch (error) {
    console.error('Failed to get prediction:', error);
    toast.error('Failed to analyze health data');
    return null;
  }
};
