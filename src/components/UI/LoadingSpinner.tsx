"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Reusable loading spinner component with configurable size and message
 */
export const LoadingSpinner = ({
  message = "Loading...",
  size = "md",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center justify-center py-16 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`${sizeClasses[size]} border-4 border-[#B09280] border-t-transparent rounded-full animate-spin`}
          aria-hidden="true"
        />
        <span className="text-[#6B7280] text-lg">{message}</span>
      </div>
    </motion.div>
  );
};
