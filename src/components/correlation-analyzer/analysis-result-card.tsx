import type { AnalysisResultData } from "@/types/correlation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

interface AnalysisResultCardProps {
  analysis: AnalysisResultData;
}

function getSentimentIcon(sentiment: string) {
  const lowerSentiment = sentiment.toLowerCase();
  if (lowerSentiment.includes("positive"))
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  if (lowerSentiment.includes("negative"))
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  return <Info className="h-5 w-5 text-blue-500" />;
}

export function AnalysisResultCard({ analysis }: AnalysisResultCardProps) {
  return (
    <Card className="w-full mt-6 shadow-lg bg-secondary/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          Feedback Analysis
        </CardTitle>
        <CardDescription>
          Here&apos;s what our AI thinks about your explanation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-1">
            Key Misconceptions Identified:
          </h3>
          {analysis.keyMisconceptions &&
          analysis.keyMisconceptions.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-sm">
              {analysis.keyMisconceptions.map((misconception, index) => (
                <li key={index}>{misconception}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No specific misconceptions identified. Well done!
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-1">Sentiment:</h3>
          <div className="flex items-center space-x-2">
            {getSentimentIcon(analysis.sentiment)}
            <Badge
              variant={
                analysis.sentiment.toLowerCase().includes("positive")
                  ? "default"
                  : analysis.sentiment.toLowerCase().includes("negative")
                    ? "destructive"
                    : "secondary"
              }
              className="capitalize"
            >
              {analysis.sentiment}
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-1">Explanation Quality:</h3>
          <p className="text-sm">{analysis.explanationQuality}</p>
        </div>
      </CardContent>
    </Card>
  );
}
