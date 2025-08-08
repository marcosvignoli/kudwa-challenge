"use client";

import React from "react";
import { motion } from "framer-motion";
import { MetricCard } from "@/components/Dashboard";
import { ReportData } from "@/types/data";

interface ComputedField {
  name: string;
  result?: number[];
  quarterly?: number[];
  yearly?: number[];
}

interface ComputedInsightsProps {
  reportData: ReportData | null;
  period: "monthly" | "quarterly" | "yearly";
}

/**
 * Computed Insights Component
 *
 * Displays the 4 key computed financial metrics using MetricCard components.
 * These are the most important calculated financial indicators.
 */
export const ComputedInsights = React.memo(
  ({ reportData, period }: ComputedInsightsProps) => {
    // Get the appropriate data array based on period
    const getPeriodData = (fieldName: string) => {
      if (!reportData?.reportResult?.computedFields) return 0;
      const field = (
        reportData.reportResult.computedFields as ComputedField[]
      ).find((item: ComputedField) => item.name === fieldName);
      if (!field) return 0;

      switch (period) {
        case "monthly":
          return field.result?.reduce((sum, val) => sum + (val || 0), 0) || 0;
        case "quarterly":
          return (
            field.quarterly?.reduce((sum, val) => sum + (val || 0), 0) || 0
          );
        case "yearly":
          return field.yearly?.reduce((sum, val) => sum + (val || 0), 0) || 0;
        default:
          return field.result?.reduce((sum, val) => sum + (val || 0), 0) || 0;
      }
    };

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };

    const formatPeriodLabel = (period: string) => {
      switch (period) {
        case "monthly":
          return "Monthly";
        case "quarterly":
          return "Quarterly";
        case "yearly":
          return "Yearly";
        default:
          return "Monthly";
      }
    };

    const computedMetrics = [
      {
        title: "Gross Profit",
        value: formatCurrency(getPeriodData("Total Gross Profit")),
        subtitle: `${formatPeriodLabel(period)} Gross Profit`,
        icon: "💰",
        color: "#698AC5", // Blue
      },
      {
        title: "Net Other Income",
        value: formatCurrency(getPeriodData("Total Net Other Income")),
        subtitle: `${formatPeriodLabel(period)} Other Income`,
        icon: "📈",
        color: "#B09280", // Brown
      },
      {
        title: "Net Operating Profits",
        value: formatCurrency(getPeriodData("Total Net Operating Profits")),
        subtitle: `${formatPeriodLabel(period)} Operating Profits`,
        icon: "📊",
        color: "#EAE62F", // Yellow
      },
      {
        title: "Net Income/(Loss)",
        value: formatCurrency(getPeriodData("Total Net Income/(Loss)")),
        subtitle: `${formatPeriodLabel(period)} Net Income`,
        icon: "💼",
        color: "#262626", // Dark Gray
      },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#262626] mb-2">
              Computed Insights
            </h2>
            <p className="text-base sm:text-lg text-[#6B7280]">
              Key financial metrics and calculations
            </p>
          </div>
          <span className="px-3 py-1 text-xs bg-[#EAE62F] text-[#262626] rounded-full font-medium">
            Calculated
          </span>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {computedMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            >
              <MetricCard
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                icon={metric.icon}
                color={metric.color}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }
);

ComputedInsights.displayName = "ComputedInsights";
