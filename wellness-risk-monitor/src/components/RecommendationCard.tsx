
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";

interface RecommendationCardProps {
  recommendation: string;
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Health Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ScrollArea className="h-[180px]">
          <div className="space-y-2">
            {recommendation.split('\n').filter(Boolean).map((rec, i) => (
              <p key={i} className="text-sm">{rec}</p>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
