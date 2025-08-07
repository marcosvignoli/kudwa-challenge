'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ReportPage = () => {
  const [currentPeriod, setCurrentPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const periods = [
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'yearly', label: 'Yearly' }
  ];

  const reportSections = [
    {
      id: 'financial-summary',
      title: 'Financial Summary',
      content: 'Detailed financial overview and key metrics...'
    },
    {
      id: 'cash-flow',
      title: 'Cash Flow Analysis',
      content: 'Comprehensive cash flow breakdown and trends...'
    },
    {
      id: 'revenue-analysis',
      title: 'Revenue Analysis',
      content: 'Revenue breakdown by source and period...'
    },
    {
      id: 'expense-breakdown',
      title: 'Expense Breakdown',
      content: 'Detailed expense categorization and analysis...'
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

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
          <h1 className="text-3xl font-bold text-[#262626]">Report</h1>
          <p className="text-[#6B7280] mt-1">Detailed financial analysis and insights</p>
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

      {/* Report Sections */}
      <div className="space-y-4">
        {reportSections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#FBFAFA] transition-colors"
            >
              <h3 className="text-lg font-semibold text-[#262626]">{section.title}</h3>
              <motion.div
                animate={{ rotate: expandedSections.includes(section.id) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#6B7280]"
              >
                ▼
              </motion.div>
            </button>
            
            <motion.div
              initial={false}
              animate={{
                height: expandedSections.includes(section.id) ? 'auto' : 0,
                opacity: expandedSections.includes(section.id) ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4 text-[#6B7280]">
                {section.content}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ReportPage;
