import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface DonutChartProps {
  data: Array<{
    name: string;
    values: number | number[];
    chartType?: string;
  }>;
  title: string;
  height?: number;
}

export const DonutChart = ({ data, title, height = 300 }: DonutChartProps) => {
  // Process data for Recharts - handle both single values and arrays
  const processedData = data.map((item) => ({
    name: item.name,
    value: Array.isArray(item.values) ? item.values[0] || 0 : item.values,
  }));

  // Kudwa brand colors
  const colors = [
    "#B09280",
    "#698AC5",
    "#EAE62F",
    "#262626",
    "#6B7280",
    "#F59E0B",
    "#10B981",
    "#EF4444",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ height: `${height}px` }}
      className="flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-100"
    >
      {data.length === 0 ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">🍩</span>
          </div>
          <p className="text-[#262626] font-medium text-lg mb-2">{title}</p>
          <p className="text-[#6B7280] text-sm">No data available</p>
        </div>
      ) : (
        <div className="w-full h-full p-4">
          <h3 className="text-lg font-semibold text-[#262626] mb-4">{title}</h3>
          <ResponsiveContainer width="100%" height={height - 100}>
            <PieChart>
              <Pie
                data={processedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {processedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(value),
                  "Amount",
                ]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: "12px",
                  color: "#6B7280",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
};
