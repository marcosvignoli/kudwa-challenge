import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ChartWrapperProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export const ChartWrapper = ({
  children,
  title,
  subtitle,
  loading = false,
  error = null,
  className = "",
}: ChartWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 overflow-visible ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#262626]">{title}</h3>
        {subtitle && <p className="text-sm text-[#6B7280] mt-1">{subtitle}</p>}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-[#B09280] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[#6B7280] text-sm">Loading chart...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <span className="text-red-500 text-2xl mb-2 block">⚠️</span>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && <div className="overflow-visible">{children}</div>}
    </motion.div>
  );
};
