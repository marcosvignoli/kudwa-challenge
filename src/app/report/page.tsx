"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchReportData, toggleSection } from "@/lib/slices/reportSlice";
import { clearError } from "@/lib/slices/appSlice";
import { ReportData, ReportProfitLossItem, ReportField } from "@/types/data";
import { KeyMetricsCharts } from "@/components/Report";

export default function ReportPage() {
  const dispatch = useAppDispatch();
  const { data, loading, error, expandedSections } = useAppSelector(
    (state: any) => state.report
  );

  useEffect(() => {
    dispatch(fetchReportData());
  }, [dispatch]);

  const handleToggleSection = (sectionId: string) => {
    dispatch(toggleSection(sectionId));
  };

  const handleToggleField = (sectionId: string, fieldId: string) => {
    dispatch(toggleSection(`${sectionId}-${fieldId}`));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Extract report sections
  const reportSections = useMemo(() => {
    if (!data?.reportResult)
      return { profitLoss: [], metrics: [], computedFields: [] };

    return {
      profitLoss: data.reportResult.profitnLoss || [],
      metrics: data.reportResult.metrics || {},
      computedFields: data.reportResult.computedFields || [],
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
              onClick={() => dispatch(clearError())}
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

          {/* Computed Fields Section */}
          {reportSections.computedFields &&
            reportSections.computedFields.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="card"
              >
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleToggleSection("computedFields")}
                  className="w-full text-left flex items-center justify-between hover:bg-[#FBFAFA]/50 transition-colors p-4 -m-4 rounded-lg"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-[#262626] mb-2">
                      Computed Insights
                    </h3>
                    <span className="px-3 py-1 text-xs bg-[#EAE62F] text-[#262626] rounded-full font-medium">
                      Calculated
                    </span>
                  </div>
                  <motion.p
                    animate={{
                      rotate: expandedSections.includes("computedFields")
                        ? 180
                        : 0,
                    }}
                    className="text-[#6B7280] text-lg"
                  >
                    ▼
                  </motion.p>
                </motion.button>

                {expandedSections.includes("computedFields") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-6 space-y-4"
                  >
                    {reportSections.computedFields.map(
                      (field: any, index: number) => {
                        // Calculate totals from different period data
                        const resultTotal = field.result
                          ? field.result.reduce(
                              (sum: number, val: number) => sum + (val || 0),
                              0
                            )
                          : 0;
                        const quarterlyTotal = field.quarterly
                          ? field.quarterly.reduce(
                              (sum: number, val: number) => sum + (val || 0),
                              0
                            )
                          : 0;
                        const yearlyTotal = field.yearly
                          ? field.yearly.reduce(
                              (sum: number, val: number) => sum + (val || 0),
                              0
                            )
                          : 0;

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="border border-gray-200 rounded-lg p-6"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-lg font-semibold text-[#262626]">
                                {field.name || `Computed Field ${index + 1}`}
                              </span>
                              <span className="px-3 py-1 text-xs bg-[#EAE62F] text-[#262626] rounded-full font-medium">
                                Calculated
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="text-center p-4 bg-[#FBFAFA] rounded-lg border border-gray-100">
                                <div className="text-sm text-[#6B7280] mb-2">
                                  Monthly
                                </div>
                                <div className="text-xl font-bold text-[#698AC5]">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(resultTotal)}
                                </div>
                              </div>
                              <div className="text-center p-4 bg-[#FBFAFA] rounded-lg border border-gray-100">
                                <div className="text-sm text-[#6B7280] mb-2">
                                  Quarterly
                                </div>
                                <div className="text-xl font-bold text-[#B09280]">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(quarterlyTotal)}
                                </div>
                              </div>
                              <div className="text-center p-4 bg-[#FBFAFA] rounded-lg border border-gray-100">
                                <div className="text-sm text-[#6B7280] mb-2">
                                  Yearly
                                </div>
                                <div className="text-xl font-bold text-[#EAE62F]">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(yearlyTotal)}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      }
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
        </motion.div>
      )}
    </motion.div>
  );
}
