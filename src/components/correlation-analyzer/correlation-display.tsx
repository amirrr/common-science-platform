import type { CorrelationData } from "@/types/correlation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

interface CorrelationDisplayProps {
  correlation: CorrelationData;
}

export function CorrelationDisplay({ correlation }: CorrelationDisplayProps) {
  const chartConfig = {
    series1: {
      label: correlation.series1Name,
      color: "hsl(var(--chart-1))",
    },
    series2: {
      label: correlation.series2Name,
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          <span style={{ color: "hsl(var(--chart-1))" }}>
            {correlation.series1Name}
          </span>
          <span className="text-muted-foreground mx-2">vs</span>
          <span style={{ color: "hsl(var(--chart-2))" }}>
            {correlation.series2Name}
          </span>
        </CardTitle>
        <CardDescription className="text-base">
          {correlation.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {correlation.imagePlaceholder ? (
          <div className="aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={correlation.imagePlaceholder.url}
              alt={correlation.imagePlaceholder.alt}
              width={800}
              height={450}
              className="object-cover"
              data-ai-hint={correlation.imagePlaceholder.aiHint}
            />
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={correlation.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="label" stroke="hsl(var(--foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--chart-1))" />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--chart-2))"
                />
                <Tooltip
                  content={
                    <ChartTooltipContent
                      labelClassName="text-sm"
                      className="rounded-lg border bg-background p-2 shadow-sm"
                    />
                  }
                  cursor={{
                    stroke: "hsl(var(--accent))",
                    strokeWidth: 2,
                    strokeDasharray: "3 3",
                  }}
                />
                <Legend content={<ChartLegendContent className="pt-5" />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="value1"
                  name={correlation.series1Name}
                  stroke="var(--color-series1)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-series1)", r: 4 }}
                  activeDot={{
                    r: 6,
                    fill: "var(--color-series1)",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                  }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="value2"
                  name={correlation.series2Name}
                  stroke="var(--color-series2)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-series2)", r: 4 }}
                  activeDot={{
                    r: 6,
                    fill: "var(--color-series2)",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
