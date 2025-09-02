import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getHealthData, getPrediction, type PredictionResult, type HealthData } from "@/services/predictionApi";
import HealthMetricCard from "./HealthMetricCard";
import RiskScoreGauge from "./RiskScoreGauge";
import RecommendationCard from "./RecommendationCard";

const HealthDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [healthData, setHealthData] = useState<HealthData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newHealthData = await getHealthData();

        // Only get prediction if heart rate has changed or if this is the first fetch
        if (!healthData || healthData.heart_rate !== newHealthData.heart_rate) {
          const newPrediction = await getPrediction(newHealthData);
          if (newPrediction) {
            setPrediction(newPrediction);
          }
        }
        
        setHealthData(newHealthData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to update health data");
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for periodic updates
    const intervalId = setInterval(fetchData, 20000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Wellness Risk Monitor</CardTitle>
          <CardDescription>
            Real-time health metrics and risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && !prediction && (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="animate-pulse-subtle text-primary">Loading health data...</div>
              </div>
            </div>
          )}
          
          {prediction && (
            <div className="grid gap-4 md:grid-cols-3">
              <HealthMetricCard
                title="Heart Rate"
                value={prediction.heart_rate}
                unit=" bpm"
                type="heart_rate"
              />
              <HealthMetricCard
                title="Daily Steps"
                value={prediction.steps}
                unit=""
                type="steps"
              />
              <HealthMetricCard
                title="Calories"
                value={prediction.calories}
                unit=" calories"
                type="calories"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {prediction && (
        <div className="grid gap-6 md:grid-cols-2">
          <RiskScoreGauge score={prediction.risk_score} />
          <RecommendationCard recommendation={prediction.recommendation} />
        </div>
      )}
    </div>
  );
};

export default HealthDashboard;
