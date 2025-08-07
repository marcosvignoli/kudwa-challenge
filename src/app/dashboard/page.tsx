'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const [currentPeriod, setCurrentPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const periods = [
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'yearly', label: 'Yearly' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#262626]">Dashboard</h1>
          <p className="text-[#6B7280] mt-1">Financial overview and insights</p>
        </div>
        
        {/* Period Selector */}
        <div className="flex space-x-2 mt-4 sm:mt-0">
          {periods.map((period) => (
            <motion.button
              key={period.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPeriod(period.id as any)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${currentPeriod === period.id
                  ? 'bg-[#B09280] text-white'
                  : 'bg-white text-[#262626] border border-gray-200 hover:bg-[#FBFAFA]'
                }
              `}
            >
              {period.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Placeholder Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-[#262626] mb-2">Cash at Bank</h3>
          <p className="text-2xl font-bold text-[#B09280]">$3,472,530</p>
          <p className="text-sm text-[#6B7280] mt-1">Current balance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-[#262626] mb-2">Revenue</h3>
          <p className="text-2xl font-bold text-[#698AC5]">$1,250,000</p>
          <p className="text-sm text-[#6B7280] mt-1">This period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-[#262626] mb-2">Expenses</h3>
          <p className="text-2xl font-bold text-[#EAE62F]">$850,000</p>
          <p className="text-sm text-[#6B7280] mt-1">This period</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-[#262626] mb-4">Financial Charts</h2>
        <div className="h-64 bg-[#FBFAFA] rounded-lg flex items-center justify-center">
          <p className="text-[#6B7280]">Charts will be implemented here</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
