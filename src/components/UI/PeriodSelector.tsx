"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPeriod } from "@/lib/slices/appSlice";

export type PeriodType = "monthly" | "quarterly" | "yearly";

interface PeriodSelectorProps {
  className?: string;
}

const periods = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "yearly", label: "Yearly" },
] as const;

/**
 * Reusable period selector component for switching between monthly, quarterly, and yearly views
 */
export const PeriodSelector = React.memo(
  ({ className = "" }: PeriodSelectorProps) => {
    const dispatch = useAppDispatch();
    const currentPeriod = useAppSelector((state) => state.app.period);

    const handlePeriodChange = (period: PeriodType) => {
      dispatch(setPeriod(period));
    };

    const handleKeyDown = (event: React.KeyboardEvent, period: PeriodType) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handlePeriodChange(period);
      }
    };

    return (
      <div
        className={`flex flex-wrap gap-2 sm:gap-3 ${className}`}
        role="radiogroup"
        aria-label="Select time period for data view"
      >
        {periods.map((period, index) => (
          <motion.button
            key={period.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePeriodChange(period.id as PeriodType)}
            onKeyDown={(e) => handleKeyDown(e, period.id as PeriodType)}
            className={`
            px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#B09280] focus:ring-offset-2
            min-h-[44px] sm:min-h-[40px] text-sm sm:text-base
            ${
              currentPeriod === period.id
                ? "btn-active shadow-md"
                : "btn-secondary"
            }
          `}
            aria-label={`Switch to ${period.label} view`}
            role="radio"
            aria-checked={currentPeriod === period.id}
            tabIndex={currentPeriod === period.id ? 0 : -1}
            aria-describedby={`period-description-${period.id}`}
          >
            {period.label}
            <span id={`period-description-${period.id}`} className="sr-only">
              {currentPeriod === period.id
                ? `Currently viewing ${period.label.toLowerCase()} data`
                : `Click to view ${period.label.toLowerCase()} data`}
            </span>
          </motion.button>
        ))}
      </div>
    );
  }
);

PeriodSelector.displayName = "PeriodSelector";
