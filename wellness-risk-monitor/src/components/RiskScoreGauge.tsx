
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

interface RiskScoreGaugeProps {
  score: number;
}

const RiskScoreGauge = ({ score }: RiskScoreGaugeProps) => {
  const percentage = score * 100;
  
  const getRiskLevel = () => {
    if (score <= 0.3) return "Low Risk";
    if (score <= 0.7) return "Moderate Risk";
    return "High Risk";
  };
  
  const getRiskColor = () => {
    if (score <= 0.3) return "text-health-low bg-green-50 dark:bg-green-950";
    if (score <= 0.7) return "text-health-medium bg-yellow-50 dark:bg-yellow-950";
    return "text-health-high bg-red-50 dark:bg-red-950";
  };
  
  const getProgressColor = () => {
    if (score <= 0.3) return "bg-health-low";
    if (score <= 0.7) return "bg-health-medium";
    return "bg-health-high";
  };

  return (
    <Card className={cn("overflow-hidden transition-all", getRiskColor())}>
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          Health Risk Score
          <AlertCircle className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-3xl font-bold mb-2">{percentage.toFixed(0)}%</div>
        <div className="text-sm mb-2">{getRiskLevel()}</div>
        <Progress value={percentage} className={cn("h-2", getProgressColor())} />
      </CardContent>
    </Card>
  );
};

export default RiskScoreGauge;
