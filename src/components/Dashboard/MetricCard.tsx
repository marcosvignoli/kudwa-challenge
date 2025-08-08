"use client";

import React from "react";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  color?: string;
  icon?: string;
}

export const MetricCard = React.memo(
  ({
    title,
    value,
    subtitle,
    change,
    changeType = "neutral",
    color = "#B09280",
    icon,
  }: MetricCardProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ duration: 0.3 }}
        className="card hover:shadow-md transition-all duration-200 h-full flex flex-col"
      >
        <div className="flex items-start justify-between flex-1">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
              {icon && <span className="text-xl sm:text-2xl">{icon}</span>}
              <h3 className="text-base sm:text-lg font-semibold text-[#262626] leading-tight">
                {title}
              </h3>
            </div>
            <p
              className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 leading-tight"
              style={{ color }}
            >
              {value}
            </p>
            <p className="text-xs sm:text-sm text-[#6B7280] mb-2 sm:mb-3">
              {subtitle}
            </p>
            {change && (
              <div className="flex items-center space-x-2 mt-auto">
                <span
                  className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
                    changeType === "positive"
                      ? "text-green-600 bg-green-50"
                      : changeType === "negative"
                      ? "text-red-600 bg-red-50"
                      : "text-[#6B7280] bg-gray-50"
                  }`}
                >
                  {changeType === "positive"
                    ? "↗"
                    : changeType === "negative"
                    ? "↘"
                    : "→"}{" "}
                  {change}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

MetricCard.displayName = "MetricCard";
