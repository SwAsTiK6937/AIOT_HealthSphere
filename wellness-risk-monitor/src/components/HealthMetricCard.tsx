
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Heart, Activity, Clock } from "lucide-react";

interface HealthMetricCardProps {
  title: string;
  value: number;
  unit: string;
  type: 'heart_rate' | 'steps' | 'calories';
  className?: string;
}

const HealthMetricCard = ({ title, value, unit, type, className }: HealthMetricCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'heart_rate':
        return <Heart className="h-6 w-6 text-health-blue" />;
      case 'steps':
        return <Activity className="h-6 w-6 text-health-orange" />;
      case 'calories':
        return <Clock className="h-6 w-6 text-health-purple" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'heart_rate':
        return 'bg-blue-50 dark:bg-blue-950';
      case 'steps':
        return 'bg-orange-50 dark:bg-orange-950';
      case 'calories':
        return 'bg-purple-50 dark:bg-purple-950';
      default:
        return '';
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all", getBgColor(), className)}>
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          {title}
          {getIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">{value}{unit}</div>
      </CardContent>
    </Card>
  );
};

export default HealthMetricCard;
