"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchDashboardData } from "@/lib/slices/dashboardSlice";
import { clearError } from "@/lib/slices/appSlice";
import { LineChart, DonutChart } from "@/components/Charts";
import { MetricCard, ChartContainer } from "@/components/Dashboard";
import { PeriodSelector } from "@/components/UI/PeriodSelector";
import { ChartDataProcessor } from "@/lib/utils/chartDataProcessor";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { period } = useAppSelector((state) => state.app);
  const { data, loading, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData(period));
  }, [dispatch, period]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  // Extract KPI data from the loaded data
  const getKPIData = () => {
    if (!data?.mainDashboardKPIs?.topKPIs) return [];
    return data.mainDashboardKPIs.topKPIs;
  };

  const getDateArray = () => {
    return data?.mainDashboard?.dateArray || [];
  };

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
          <h1 className="text-4xl font-bold text-[#262626] mb-2">Dashboard</h1>
          <p className="text-[#6B7280] text-lg">
            Financial overview and insights
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
              Loading dashboard data...
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
              onClick={handleClearError}
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
          {/* Metrics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {getKPIData().map((kpi, index) => (
              <MetricCard
                key={kpi.name}
                title={kpi.name}
                value={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(kpi.value)}
                subtitle={kpi.date || "This period"}
                change={
                  kpi.mOm
                    ? `${kpi.mOm > 0 ? "+" : ""}${kpi.mOm.toFixed(1)}%`
                    : undefined
                }
                changeType={kpi.mOm && kpi.mOm > 0 ? "positive" : "negative"}
                color={
                  index === 0
                    ? "#698AC5"
                    : index === 1
                    ? "#EAE62F"
                    : index === 2
                    ? "#B09280"
                    : "#6B7280"
                }
                icon={
                  index === 0
                    ? "💰"
                    : index === 1
                    ? "💸"
                    : index === 2
                    ? "📈"
                    : "💳"
                }
              />
            ))}
          </motion.div>

          {/* Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <ChartContainer title="Cash at Bank Trend">
              <LineChart
                data={ChartDataProcessor.getDashboardLineChartData(
                  data,
                  "cashAtBank"
                )}
                title="Cash at Bank Over Time"
                height={300}
                dateArray={getDateArray()}
              />
            </ChartContainer>
            <ChartContainer title="Expense Breakdown">
              <DonutChart
                data={ChartDataProcessor.getDashboardDonutChartData(
                  data,
                  "expenseSplit",
                  8
                )}
                title="Expenses by Category"
                height={300}
              />
            </ChartContainer>
          </motion.div>

          {/* Additional Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <ChartContainer title="Revenue Split">
              <DonutChart
                data={ChartDataProcessor.getDashboardDonutChartData(
                  data,
                  "totalRevenuesSplit",
                  8
                )}
                title="Revenue by Category"
                height={300}
              />
            </ChartContainer>
            <ChartContainer title="Profit & Loss Overview">
              <LineChart
                data={ChartDataProcessor.getDashboardLineChartData(
                  data,
                  "profitLossOverview"
                )}
                title="Profit & Loss Over Time"
                height={300}
                dateArray={getDateArray()}
              />
            </ChartContainer>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
