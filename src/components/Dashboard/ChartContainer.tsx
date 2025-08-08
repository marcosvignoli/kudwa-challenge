import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
}

export const ChartContainer = ({ title, children }: ChartContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className="card hover:shadow-md transition-all duration-200 overflow-visible"
    >
      <h3 className="text-lg sm:text-xl font-semibold text-[#262626] mb-4 sm:mb-6">
        {title}
      </h3>
      <div className="overflow-visible">{children}</div>
    </motion.div>
  );
};
