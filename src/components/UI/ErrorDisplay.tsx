"use client";

import React from "react";
import { motion } from "framer-motion";

interface ErrorDisplayProps {
  error: string;
  onDismiss: () => void;
  className?: string;
}

/**
 * Reusable error display component with dismiss functionality
 */
export const ErrorDisplay = React.memo(
  ({ error, onDismiss, className = "" }: ErrorDisplayProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}
        role="alert"
        aria-live="assertive"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-red-500 text-2xl" aria-hidden="true">
              ⚠️
            </span>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
          <button
            onClick={onDismiss}
            className="text-red-500 hover:text-red-700 text-sm underline font-medium"
            aria-label="Dismiss error message"
          >
            Dismiss
          </button>
        </div>
      </motion.div>
    );
  }
);

ErrorDisplay.displayName = "ErrorDisplay";
