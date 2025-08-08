import React from "react";
import { motion } from "framer-motion";
import { LineChart, DonutChart, ChartWrapper } from "@/components/Charts";
import { ChartDataProcessor } from "@/lib/utils/chartDataProcessor";
import { ReportData } from "@/types/data";

interface ComputedField {
  name: string;
  result?: number[];
  quarterly?: number[];
  yearly?: number[];
}

interface KeyMetricsChartsProps {
  reportData: ReportData | null;
  period: "monthly" | "quarterly" | "yearly";
  loading?: boolean;
  error?: string | null;
}

export const KeyMetricsCharts = React.memo(
  ({
    reportData,
    period,
    loading = false,
    error = null,
  }: KeyMetricsChartsProps) => {
    // Extract chart data using correct data sources
    const netProfitData = ChartDataProcessor.getComputedFieldLineChartData(
      reportData,
      "Total Net Income/(Loss)",
      period
    );

    const revenueData = ChartDataProcessor.getReportDonutChartData(
      reportData,
      "Total Revenues",
      period
    );

    const expenseData = ChartDataProcessor.getReportLineChartData(
      reportData,
      "Total Expenses",
      period
    );

    const grossProfitData = ChartDataProcessor.getComputedFieldDonutChartData(
      reportData,
      "Total Gross Profit",
      period
    );

    // Generate date array for line charts
    const dateArray = ChartDataProcessor.generateReportDateArray(
      reportData,
      period
    );

    // Calculate key metrics for display with better validation
    const calculateMetricValue = (data: unknown[]) => {
      if (!data || data.length === 0) return 0;
      const total = data.reduce((sum: number, item) => {
        if (item && typeof item === "object" && "values" in item) {
          const values = Array.isArray((item as { values: unknown }).values)
            ? (item as { values: number[] }).values
            : [(item as { values: number }).values];
          return (
            sum +
            values.reduce(
              (valSum: number, val: number) => valSum + (val || 0),
              0
            )
          );
        }
        return sum;
      }, 0);
      return total > 0 ? total : 0;
    };

    // Calculate computed field totals directly from data
    const calculateComputedFieldTotal = (fieldName: string) => {
      if (!reportData?.reportResult?.computedFields) return 0;
      const field = (
        reportData.reportResult.computedFields as ComputedField[]
      ).find((item: ComputedField) => item.name === fieldName);
      if (!field || !field.result) return 0;
      const total = field.result.reduce((sum, val) => sum + (val || 0), 0);
      return total > 0 ? total : 0;
    };

    const netProfitTotal = calculateComputedFieldTotal(
      "Total Net Income/(Loss)"
    );
    const revenueTotal = calculateMetricValue(revenueData);
    const expenseTotal = calculateMetricValue(expenseData);
    const grossProfitTotal = calculateComputedFieldTotal("Total Gross Profit");

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Key Metrics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] font-medium">Net Profit</p>
                <p className="text-2xl font-bold text-[#698AC5]">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(netProfitTotal)}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#698AC5]/10 rounded-lg flex items-center justify-center">
                <span className="text-[#698AC5] text-xl">💰</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] font-medium">Revenue</p>
                <p className="text-2xl font-bold text-[#B09280]">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(revenueTotal)}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#B09280]/10 rounded-lg flex items-center justify-center">
                <span className="text-[#B09280] text-xl">📈</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] font-medium">Expenses</p>
                <p className="text-2xl font-bold text-[#EAE62F]">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(expenseTotal)}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#EAE62F]/10 rounded-lg flex items-center justify-center">
                <span className="text-[#EAE62F] text-xl">💸</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] font-medium">
                  Gross Profit
                </p>
                <p className="text-2xl font-bold text-[#262626]">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(grossProfitTotal)}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#262626]/10 rounded-lg flex items-center justify-center">
                <span className="text-[#262626] text-xl">📊</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Net Profit Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <ChartWrapper
              title="Net Profit Trend"
              subtitle={`${
                period.charAt(0).toUpperCase() + period.slice(1)
              } performance over time`}
              loading={loading}
              error={error}
            >
              <LineChart
                data={netProfitData}
                title="Net Profit Trend"
                dateArray={dateArray}
                height={280}
              />
            </ChartWrapper>
          </motion.div>

          {/* Revenue Composition */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ChartWrapper
              title="Revenue Composition"
              subtitle="Breakdown of revenue sources"
              loading={loading}
              error={error}
            >
              <DonutChart
                data={revenueData}
                title="Revenue Composition"
                height={280}
              />
            </ChartWrapper>
          </motion.div>

          {/* Expense Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <ChartWrapper
              title="Expense Analysis"
              subtitle={`${
                period.charAt(0).toUpperCase() + period.slice(1)
              } expense trends`}
              loading={loading}
              error={error}
            >
              <LineChart
                data={expenseData}
                title="Expense Analysis"
                dateArray={dateArray}
                height={280}
              />
            </ChartWrapper>
          </motion.div>

          {/* Profit Margin Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ChartWrapper
              title="Profit Margin Breakdown"
              subtitle="Gross vs Net profit composition"
              loading={loading}
              error={error}
            >
              <DonutChart
                data={grossProfitData}
                title="Profit Margin Breakdown"
                height={280}
              />
            </ChartWrapper>
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

KeyMetricsCharts.displayName = "KeyMetricsCharts";
