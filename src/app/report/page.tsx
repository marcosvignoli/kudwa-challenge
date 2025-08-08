"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleExpandedSection } from "@/lib/slices/uiSlice";
import { loadReportData } from "@/lib/data";
import { ReportProfitLossItem, ReportField, ReportData } from "@/types/data";
import { KeyMetricsCharts, ComputedInsights } from "@/components/Report";

/**
 * Report Page Component
 *
 * Comprehensive financial report page with expandable sections and interactive charts.
 * Features:
 * - Dynamic data loading from JSON files
 * - Expandable/collapsible sections for better UX
 * - Interactive charts with period switching
 * - Real-time data processing and calculations
 * - Responsive design optimized for mobile
 * - Error boundaries and loading states
 * - Professional financial data visualization
 */

export default function ReportPage() {
  const dispatch = useAppDispatch();
  const { expandedSections } = useAppSelector((state) => state.ui);
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const reportData = await loadReportData();
        setData(reportData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load report data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleToggleSection = (sectionId: string) => {
    dispatch(toggleExpandedSection(sectionId));
  };

  const handleToggleField = (sectionId: string, fieldId: string) => {
    const fieldKey = `${sectionId}-${fieldId}`;
    dispatch(toggleExpandedSection(fieldKey));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Extract report sections
  const reportSections = useMemo(() => {
    if (!data?.reportResult) return { profitLoss: [], metrics: [] };

    return {
      profitLoss: data.reportResult.profitnLoss || [],
      metrics: data.reportResult.metrics || {},
    };
  }, [data]);

  // Calculate totals for profit & loss items
  const calculateItemTotal = (item: ReportProfitLossItem) => {
    if (item.fields && item.fields.length > 0) {
      return item.fields.reduce((total, field) => {
        const fieldValues = field.actualData[0]?.value || [];
        return total + fieldValues.reduce((sum, val) => sum + (val || 0), 0);
      }, 0);
    }
    return 0;
  };

  // Calculate field total
  const calculateFieldTotal = (field: ReportField) => {
    const fieldValues = field.actualData[0]?.value || [];
    return fieldValues.reduce((sum, val) => sum + (val || 0), 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 sm:space-y-8 min-h-screen"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#262626] mb-2">
            Financial Report
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280]">
            Dynamic financial analysis and insights
          </p>
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

      {/* Report Content */}
      {!loading && !error && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          {/* Computed Insights Section */}
          <ComputedInsights reportData={data} period={period} />

          {/* Profit & Loss Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleToggleSection("profitLoss")}
              className="w-full text-left flex items-center justify-between hover:bg-[#FBFAFA]/50 transition-colors p-4 -m-4 rounded-lg"
            >
              <div>
                <h3 className="text-xl font-semibold text-[#262626] mb-2">
                  Profit & Loss Statement
                </h3>
                <span className="px-3 py-1 text-xs bg-[#B09280] text-white rounded-full font-medium">
                  P&L
                </span>
              </div>
              <motion.p
                animate={{
                  rotate: expandedSections.includes("profitLoss") ? 180 : 0,
                }}
                className="text-[#6B7280] text-lg"
              >
                ▼
              </motion.p>
            </motion.button>

            {expandedSections.includes("profitLoss") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-6 space-y-4"
              >
                {reportSections.profitLoss.map((item: ReportProfitLossItem) => {
                  const itemTotal = calculateItemTotal(item);
                  const isExpanded = expandedSections.includes(
                    `profitLoss-${item.id}`
                  );

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() =>
                          handleToggleField("profitLoss", item.id.toString())
                        }
                        className="w-full text-left flex items-center justify-between hover:bg-gray-50 transition-colors p-2 -m-2 rounded"
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              item.type === "revenue"
                                ? "bg-green-100 text-green-800"
                                : item.type === "expenses"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.type}
                          </span>
                          <span className="font-medium text-[#262626]">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`font-semibold ${
                              item.type === "revenue"
                                ? "text-green-600"
                                : item.type === "expenses"
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                          >
                            {formatCurrency(itemTotal)}
                          </span>
                          <motion.p
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            className="text-[#6B7280] text-sm"
                          >
                            ▼
                          </motion.p>
                        </div>
                      </motion.button>

                      {isExpanded && item.fields && item.fields.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 pl-6 space-y-2"
                        >
                          {item.fields.map((field: ReportField) => {
                            const fieldTotal = calculateFieldTotal(field);
                            return (
                              <motion.div
                                key={field.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
                              >
                                <span className="text-sm text-[#6B7280]">
                                  {field.name}
                                </span>
                                <span className="text-sm font-medium text-[#262626]">
                                  {formatCurrency(fieldTotal)}
                                </span>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced Key Metrics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleToggleSection("metrics")}
              className="w-full text-left flex items-center justify-between hover:bg-[#FBFAFA]/50 transition-colors p-4 -m-4 rounded-lg"
            >
              <div>
                <h3 className="text-xl font-semibold text-[#262626] mb-2">
                  Key Performance Metrics
                </h3>
                <span className="px-3 py-1 text-xs bg-[#698AC5] text-white rounded-full font-medium">
                  Enhanced KPIs
                </span>
              </div>
              <motion.p
                animate={{
                  rotate: expandedSections.includes("metrics") ? 180 : 0,
                }}
                className="text-[#6B7280] text-lg"
              >
                ▼
              </motion.p>
            </motion.button>

            {expandedSections.includes("metrics") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-6"
              >
                <KeyMetricsCharts
                  reportData={data}
                  period="monthly"
                  loading={loading}
                  error={error}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
