import {
  processReportData,
  calculateReportTotals,
  processExpenseBreakdown,
} from "../reportDataProcessing";
import { ReportData, Period } from "@/types/data";

const mockReportData: ReportData = {
  summary: {
    totalRevenue: 500000,
    totalExpenses: 300000,
    netIncome: 200000,
    profitMargin: 40,
  },
  cashFlow: {
    operating: 180000,
    investing: -50000,
    financing: -30000,
    netCashFlow: 100000,
  },
  revenueBreakdown: [
    { category: "Product Sales", amount: 400000, percentage: 80 },
    { category: "Services", amount: 100000, percentage: 20 },
  ],
  expenseBreakdown: [
    { category: "Marketing", amount: 80000, percentage: 26.67 },
    { category: "Operations", amount: 60000, percentage: 20 },
    { category: "Technology", amount: 40000, percentage: 13.33 },
    { category: "HR", amount: 30000, percentage: 10 },
    { category: "Other", amount: 90000, percentage: 30 },
  ],
  keyMetrics: {
    customerAcquisitionCost: 150,
    customerLifetimeValue: 2500,
    churnRate: 5,
    averageOrderValue: 500,
  },
};

describe("reportDataProcessing", () => {
  describe("processReportData", () => {
    it("should process report data correctly", () => {
      const result = processReportData(mockReportData, "monthly");

      expect(result).toBeDefined();
      expect(result.summary).toEqual(mockReportData.summary);
      expect(result.cashFlow).toEqual(mockReportData.cashFlow);
      expect(result.revenueBreakdown).toHaveLength(2);
      expect(result.expenseBreakdown).toHaveLength(5);
      expect(result.keyMetrics).toEqual(mockReportData.keyMetrics);
    });

    it("should handle different periods", () => {
      const monthlyResult = processReportData(mockReportData, "monthly");
      const quarterlyResult = processReportData(mockReportData, "quarterly");
      const yearlyResult = processReportData(mockReportData, "yearly");

      expect(monthlyResult).toBeDefined();
      expect(quarterlyResult).toBeDefined();
      expect(yearlyResult).toBeDefined();
    });

    it("should handle empty data", () => {
      const emptyData: ReportData = {
        summary: {
          totalRevenue: 0,
          totalExpenses: 0,
          netIncome: 0,
          profitMargin: 0,
        },
        cashFlow: { operating: 0, investing: 0, financing: 0, netCashFlow: 0 },
        revenueBreakdown: [],
        expenseBreakdown: [],
        keyMetrics: {
          customerAcquisitionCost: 0,
          customerLifetimeValue: 0,
          churnRate: 0,
          averageOrderValue: 0,
        },
      };

      const result = processReportData(emptyData, "monthly");

      expect(result).toBeDefined();
      expect(result.summary.totalRevenue).toBe(0);
      expect(result.revenueBreakdown).toHaveLength(0);
      expect(result.expenseBreakdown).toHaveLength(0);
    });
  });

  describe("calculateReportTotals", () => {
    it("should calculate totals correctly", () => {
      const processedData = processReportData(mockReportData, "monthly");
      const totals = calculateReportTotals(processedData);

      expect(totals.totalRevenue).toBe(500000);
      expect(totals.totalExpenses).toBe(300000);
      expect(totals.netIncome).toBe(200000);
      expect(totals.profitMargin).toBe(40);
    });

    it("should calculate cash flow totals", () => {
      const processedData = processReportData(mockReportData, "monthly");
      const totals = calculateReportTotals(processedData);

      expect(totals.cashFlow.operating).toBe(180000);
      expect(totals.cashFlow.investing).toBe(-50000);
      expect(totals.cashFlow.financing).toBe(-30000);
      expect(totals.cashFlow.netCashFlow).toBe(100000);
    });

    it("should handle zero values", () => {
      const emptyData: ReportData = {
        summary: {
          totalRevenue: 0,
          totalExpenses: 0,
          netIncome: 0,
          profitMargin: 0,
        },
        cashFlow: { operating: 0, investing: 0, financing: 0, netCashFlow: 0 },
        revenueBreakdown: [],
        expenseBreakdown: [],
        keyMetrics: {
          customerAcquisitionCost: 0,
          customerLifetimeValue: 0,
          churnRate: 0,
          averageOrderValue: 0,
        },
      };

      const processedData = processReportData(emptyData, "monthly");
      const totals = calculateReportTotals(processedData);

      expect(totals.totalRevenue).toBe(0);
      expect(totals.totalExpenses).toBe(0);
      expect(totals.netIncome).toBe(0);
      expect(totals.profitMargin).toBe(0);
    });
  });

  describe("processExpenseBreakdown", () => {
    it("should process expense breakdown correctly", () => {
      const mockExpenses = [
        { category: "Marketing", amount: 80000, percentage: 26.67 },
        { category: "Operations", amount: 60000, percentage: 20 },
        { category: "Technology", amount: 40000, percentage: 13.33 },
        { category: "HR", amount: 30000, percentage: 10 },
        { category: "Other", amount: 90000, percentage: 30 },
      ];

      const result = processExpenseBreakdown(mockExpenses);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({
        name: "Marketing",
        value: 80000,
        percentage: 26.67,
      });
    });

    it("should limit categories to 8 and group others", () => {
      const mockExpenses = Array.from({ length: 10 }, (_, i) => ({
        category: `Category${i + 1}`,
        amount: 10000 - i * 1000,
        percentage: 10 - i * 1,
      }));

      const result = processExpenseBreakdown(mockExpenses);

      expect(result).toHaveLength(9); // 8 categories + "Others"
      expect(result[8].name).toBe("Others");
    });

    it("should handle empty expense data", () => {
      const result = processExpenseBreakdown([]);
      expect(result).toHaveLength(0);
    });
  });
});
