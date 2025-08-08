"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loadReportData } from "@/lib/data";
import { LineChart, DonutChart, ChartWrapper } from "@/components/Charts";
import { ChartDataProcessor } from "@/lib/utils/chartDataProcessor";
import { extractFinancialSummary } from "@/lib/utils/reportDataProcessing";
import { ReportData } from "@/types/data";

type PeriodType = "monthly" | "quarterly" | "yearly";

const periods = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "yearly", label: "Yearly" },
];

export default function ReportPage() {
  const [currentPeriod, setCurrentPeriod] = useState<PeriodType>("monthly");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await loadReportData();
        setData(result as unknown as ReportData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handlePeriodChange = (period: PeriodType) => {
    setCurrentPeriod(period);
  };

  const handleToggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Extract financial summary data
  const financialSummary = extractFinancialSummary(data);

  // Generate date array for charts
  const dateArray = ChartDataProcessor.generateReportDateArray(
    data,
    currentPeriod
  );

  // Get processed chart data using the standardized processor
  const revenueDonutData = ChartDataProcessor.getReportDonutChartData(
    data,
    "Total Revenues",
    currentPeriod,
    8
  );

  const expensesDonutData = ChartDataProcessor.getReportDonutChartData(
    data,
    "Total Expenses",
    currentPeriod,
    8
  );

  const revenueLineData = ChartDataProcessor.getReportLineChartData(
    data,
    "Total Revenues",
    currentPeriod
  );

  const expensesLineData = ChartDataProcessor.getReportLineChartData(
    data,
    "Total Expenses",
    currentPeriod
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-[#262626] mb-2">
            Financial Report
          </h1>
          <p className="text-[#6B7280] text-lg">
            Comprehensive financial analysis and insights for {currentPeriod}{" "}
            period
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex space-x-3 mt-4 sm:mt-0">
          {periods.map((period, index) => (
            <motion.button
              key={period.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePeriodChange(period.id as PeriodType)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${
                  currentPeriod === period.id
                    ? "btn-active shadow-md"
                    : "btn-secondary"
                }
              `}
            >
              {period.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-16"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-4 border-[#B09280] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[#6B7280] text-lg">
              Loading report data...
            </span>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-red-500 text-2xl">⚠️</span>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 text-sm underline font-medium"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}

      {/* Content */}
      {!loading && !error && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          {/* Financial Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="card"
              >
                <h4 className="font-semibold text-[#262626] mb-3 text-lg">
                  Cash at Bank
                </h4>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#B09280] mb-2 break-words">
                  {formatCurrency(financialSummary.cashAtBank)}
                </p>
                <p className="text-[#6B7280]">Current balance</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="card"
              >
                <h4 className="font-semibold text-[#262626] mb-3 text-lg">
                  Total Revenue
                </h4>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#698AC5] mb-2 break-words">
                  {formatCurrency(financialSummary.revenue)}
                </p>
                <p className="text-[#6B7280]">This period</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="card"
              >
                <h4 className="font-semibold text-[#262626] mb-3 text-lg">
                  Total Expenses
                </h4>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#EAE62F] mb-2 break-words">
                  {formatCurrency(financialSummary.expenses)}
                </p>
                <p className="text-[#6B7280]">This period</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Report Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-6"
          >
            {/* Revenue Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="card"
            >
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleToggleSection("revenue")}
                className="w-full text-left flex items-center justify-between hover:bg-[#FBFAFA]/50 transition-colors p-4 -m-4 rounded-lg"
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#262626] mb-2">
                    Revenue Analysis
                  </h3>
                  <span className="px-3 py-1 text-xs bg-[#B09280] text-white rounded-full font-medium">
                    Revenue
                  </span>
                </div>
                <motion.p
                  animate={{
                    rotate: expandedSections.includes("revenue") ? 180 : 0,
                  }}
                  className="text-[#6B7280] text-lg"
                >
                  ▼
                </motion.p>
              </motion.button>
              {expandedSections.includes("revenue") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ChartWrapper title="Revenue Trend">
                      <LineChart
                        data={revenueLineData}
                        title="Revenue Over Time"
                        height={300}
                        dateArray={dateArray}
                      />
                    </ChartWrapper>
                    <ChartWrapper title="Revenue by Category">
                      <DonutChart
                        data={revenueDonutData}
                        title="Revenue Breakdown"
                        height={300}
                      />
                    </ChartWrapper>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Expense Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="card"
            >
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleToggleSection("expenses")}
                className="w-full text-left flex items-center justify-between hover:bg-[#FBFAFA]/50 transition-colors p-4 -m-4 rounded-lg"
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#262626] mb-2">
                    Expense Analysis
                  </h3>
                  <span className="px-3 py-1 text-xs bg-[#B09280] text-white rounded-full font-medium">
                    Expenses
                  </span>
                </div>
                <motion.p
                  animate={{
                    rotate: expandedSections.includes("expenses") ? 180 : 0,
                  }}
                  className="text-[#6B7280] text-lg"
                >
                  ▼
                </motion.p>
              </motion.button>
              {expandedSections.includes("expenses") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ChartWrapper title="Expense Trend">
                      <LineChart
                        data={expensesLineData}
                        title="Expenses Over Time"
                        height={300}
                        dateArray={dateArray}
                      />
                    </ChartWrapper>
                    <ChartWrapper title="Expense Breakdown">
                      <DonutChart
                        data={expensesDonutData}
                        title="Expenses by Category"
                        height={300}
                      />
                    </ChartWrapper>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
