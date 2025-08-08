"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchReportData, toggleSection } from "@/lib/slices/reportSlice";
import { clearError } from "@/lib/slices/appSlice";
import { LineChart, DonutChart, ChartWrapper } from "@/components/Charts";
import { ChartDataProcessor } from "@/lib/utils/chartDataProcessor";
import { extractFinancialSummary } from "@/lib/utils/reportDataProcessing";
import { PeriodSelector } from "@/components/UI/PeriodSelector";

export default function ReportPage() {
  const dispatch = useAppDispatch();
  const { period } = useAppSelector((state) => state.app);
  const { data, loading, error, expandedSections } = useAppSelector(
    (state) => state.report
  );

  useEffect(() => {
    dispatch(fetchReportData());
  }, [dispatch]);

  const handleToggleSection = (sectionId: string) => {
    dispatch(toggleSection(sectionId));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Extract financial summary data
  const financialSummary = extractFinancialSummary(data as any);

  // Generate date array for charts
  const dateArray = ChartDataProcessor.generateReportDateArray(
    data as any,
    period
  );

  // Get processed chart data using the standardized processor
  const revenueDonutData = ChartDataProcessor.getReportDonutChartData(
    data as any,
    "Total Revenues",
    period,
    8
  );

  const expensesDonutData = ChartDataProcessor.getReportDonutChartData(
    data as any,
    "Total Expenses",
    period,
    8
  );

  const revenueLineData = ChartDataProcessor.getReportLineChartData(
    data as any,
    "Total Revenues",
    period
  );

  const expensesLineData = ChartDataProcessor.getReportLineChartData(
    data as any,
    "Total Expenses",
    period
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
            Comprehensive financial analysis and insights for {period} period
          </p>
        </div>

        {/* Period Selector */}
        <PeriodSelector className="mt-4 sm:mt-0" />
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
              onClick={() => dispatch(clearError())}
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
