import { motion } from "framer-motion";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LineChartProps {
  data: Array<{
    name: string;
    values: number[];
  }>;
  title: string;
  height?: number;
  dateArray?: string[];
}

interface ProcessedDataPoint {
  date: string;
  [key: string]: string | number;
}

export const LineChart = ({
  data,
  title,
  height = 300,
  dateArray = [],
}: LineChartProps) => {
  // Process data for Recharts
  const processedData: ProcessedDataPoint[] = dateArray.map((date, index) => {
    const dataPoint: ProcessedDataPoint = { date };
    data.forEach((series) => {
      if (series.values[index] !== undefined) {
        dataPoint[series.name] = series.values[index];
      }
    });
    return dataPoint;
  });

  // Kudwa brand colors
  const colors = ["#B09280", "#698AC5", "#EAE62F", "#262626", "#6B7280"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ height: `${height}px` }}
      className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
    >
      {data.length === 0 ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-[#262626] font-medium text-lg mb-2">{title}</p>
          <p className="text-[#6B7280] text-sm">No data available</p>
        </div>
      ) : (
        <div className="w-full h-full p-4">
          <h3 className="text-lg font-semibold text-[#262626] mb-4">{title}</h3>
          <ResponsiveContainer width="100%" height={height - 100}>
            <RechartsLineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ color: "#262626", fontWeight: "600" }}
              />
              <Legend />
              {data.map((series, index) => (
                <Line
                  key={series.name}
                  type="monotone"
                  dataKey={series.name}
                  stroke={colors[index % colors.length]}
                  strokeWidth={3}
                  dot={{
                    fill: colors[index % colors.length],
                    strokeWidth: 2,
                    r: 5,
                  }}
                  activeDot={{
                    r: 8,
                    stroke: colors[index % colors.length],
                    strokeWidth: 3,
                  }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
};
