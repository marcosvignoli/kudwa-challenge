import React from "react";
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
    value: number;
  }>;
  title: string;
  height?: number;
}

export const DonutChart = React.memo(
  ({ data, title, height = 300 }: DonutChartProps) => {
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

    // Filter out zero values and validate data
    const validData = data.filter(
      (item) => item && item.name && item.value > 0
    );

    // Generate accessibility description
    const totalValue = validData.reduce((sum, item) => sum + item.value, 0);
    const chartDescription = `${title} showing ${
      validData.length
    } categories with a total value of ${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(totalValue)}`;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-100 overflow-visible"
        role="region"
        aria-label={title}
        aria-describedby={`chart-description-${title
          .replace(/\s+/g, "-")
          .toLowerCase()}`}
      >
        {validData.length === 0 ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl" aria-hidden="true">
                🍩
              </span>
            </div>
            <p className="text-[#262626] font-medium text-lg mb-2">{title}</p>
            <p className="text-[#6B7280] text-sm">
              {data.length === 0
                ? "No data available"
                : "No valid data to display"}
            </p>
            {process.env.NODE_ENV === "development" && (
              <p className="text-xs text-gray-400 mt-2">
                Debug: {data.length} items, {validData.length} valid
              </p>
            )}
          </div>
        ) : (
          <div className="w-full p-6">
            <h3 className="text-lg font-semibold text-[#262626] mb-4">
              {title}
            </h3>
            <div
              id={`chart-description-${title
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              className="sr-only"
            >
              {chartDescription}
            </div>
            <ResponsiveContainer width="100%" height={height}>
              <PieChart>
                <Pie
                  data={validData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {validData.map((entry, index) => (
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
                  height={100}
                  wrapperStyle={{
                    fontSize: "12px",
                    color: "#6B7280",
                    lineHeight: "1.6",
                  }}
                  layout="horizontal"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>
    );
  }
);

DonutChart.displayName = "DonutChart";
