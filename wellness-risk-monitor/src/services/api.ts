import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:8000';

export interface HealthData {
  heart_rate: number;
  steps: number;
  calories: number;
  risk_score?: number;
  recommendation?: string;
}

export const fetchPrediction = async (data: HealthData): Promise<HealthData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        heartRate: data.heart_rate,
        steps: data.steps,
        calories: data.calories
      }),
    });
    
    if (!response.ok) throw new Error('Failed to get prediction');
    return await response.json();
  } catch (error) {
    console.error('Error getting prediction:', error);
    toast.error('Failed to get health prediction');
    throw error;
  }
};

export const startPredictionPolling = (
  initialData: HealthData,
  onPredictionUpdate: (data: HealthData) => void,
  interval = 20000 // 20 seconds
) => {
  const fetchData = async () => {
    try {
      const prediction = await fetchPrediction(initialData);
      onPredictionUpdate(prediction);
    } catch (error) {
      console.error('Error in prediction polling:', error);
    }
  };

  // Initial fetch
  fetchData();

  // Set up polling
  const intervalId = setInterval(fetchData, interval);

  // Return cleanup function
  return () => clearInterval(intervalId);
}; 