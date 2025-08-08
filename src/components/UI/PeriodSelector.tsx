"use client";

import { motion } from "framer-motion";

export type PeriodType = "monthly" | "quarterly" | "yearly";

interface PeriodSelectorProps {
  currentPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
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
export const PeriodSelector = ({
  currentPeriod,
  onPeriodChange,
  className = "",
}: PeriodSelectorProps) => {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {periods.map((period, index) => (
        <motion.button
          key={period.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPeriodChange(period.id as PeriodType)}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${
              currentPeriod === period.id
                ? "btn-active shadow-md"
                : "btn-secondary"
            }
          `}
          aria-label={`Switch to ${period.label} view`}
          role="button"
          tabIndex={0}
        >
          {period.label}
        </motion.button>
      ))}
    </div>
  );
};
