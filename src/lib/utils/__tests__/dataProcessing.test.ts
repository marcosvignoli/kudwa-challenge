import {
  extractKPIData,
  extractChartData,
  extractDateArray,
  processDonutChartData,
  processLineChartData,
  validateAndProcessChartData,
  getProcessedChartData,
} from "../dataProcessing";
import { MainDashboardData } from "@/types/data";

// Mock data for testing
const mockDashboardData: MainDashboardData = {
  mainDashboardKPIs: {
    topKPIs: [
      { name: "Revenue", value: 500000, change: "+15%" },
      { name: "Expenses", value: 300000, change: "-5%" },
    ],
  },
  mainDashboard: {
    dateArray: ["Jan", "Feb", "Mar"],
    charts: {
      cashFlow: [
        { name: "Income", values: [50000, 55000, 60000] },
        { name: "Expenses", values: [30000, 32000, 35000] },
      ],
      revenue: [{ name: "Revenue", values: [50000, 55000, 60000] }],
      expenses: [
        { name: "Marketing", values: 15000 },
        { name: "Operations", values: 12000 },
        { name: "Technology", values: 8000 },
      ],
    },
  },
};

describe("dataProcessing", () => {
  describe("extractKPIData", () => {
    it("should extract KPI data correctly", () => {
      const result = extractKPIData(mockDashboardData);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        name: "Revenue",
        value: 500000,
        change: "+15%",
      });
      expect(result[1]).toEqual({
        name: "Expenses",
        value: 300000,
        change: "-5%",
      });
    });

    it("should handle null data", () => {
      const result = extractKPIData(null);
      expect(result).toHaveLength(0);
    });

    it("should handle missing KPI data", () => {
      const result = extractKPIData({} as MainDashboardData);
      expect(result).toHaveLength(0);
    });
  });

  describe("extractChartData", () => {
    it("should extract chart data correctly", () => {
      const result = extractChartData(mockDashboardData, "cashFlow");

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        name: "Income",
        values: [50000, 55000, 60000],
      });
    });

    it("should handle missing chart key", () => {
      const result = extractChartData(mockDashboardData, "nonexistent");
      expect(result).toHaveLength(0);
    });

    it("should handle null data", () => {
      const result = extractChartData(null, "cashFlow");
      expect(result).toHaveLength(0);
    });
  });

  describe("extractDateArray", () => {
    it("should extract date array correctly", () => {
      const result = extractDateArray(mockDashboardData);

      expect(result).toEqual(["Jan", "Feb", "Mar"]);
    });

    it("should handle missing date array", () => {
      const result = extractDateArray({} as MainDashboardData);
      expect(result).toHaveLength(0);
    });
  });

  describe("processDonutChartData", () => {
    it("should process donut chart data correctly", () => {
      const mockData = [
        { name: "Marketing", values: 15000 },
        { name: "Operations", values: 12000 },
        { name: "Technology", values: 8000 },
      ];

      const result = processDonutChartData(mockData);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ name: "Marketing", value: 15000 });
      expect(result[1]).toEqual({ name: "Operations", value: 12000 });
      expect(result[2]).toEqual({ name: "Technology", value: 8000 });
    });

    it("should handle array values", () => {
      const mockData = [{ name: "Category", values: [1000, 2000] }];

      const result = processDonutChartData(mockData);

      expect(result[0]).toEqual({ name: "Category", value: 1000 });
    });
  });

  describe("processLineChartData", () => {
    it("should process line chart data correctly", () => {
      const mockData = [
        { name: "Income", values: [50000, 55000, 60000] },
        { name: "Expenses", values: [30000, 32000, 35000] },
      ];
      const dateArray = ["Jan", "Feb", "Mar"];

      const result = processLineChartData(mockData, dateArray);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        name: "Income",
        values: [50000, 55000, 60000],
      });
    });

    it("should handle empty data", () => {
      const result = processLineChartData([], []);
      expect(result).toHaveLength(0);
    });
  });

  describe("validateAndProcessChartData", () => {
    it("should process donut chart data", () => {
      const mockData = [
        { name: "Marketing", values: 15000 },
        { name: "Operations", values: 12000 },
      ];

      const result = validateAndProcessChartData(mockData, "donut");

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ name: "Marketing", value: 15000 });
    });

    it("should handle invalid data", () => {
      const result = validateAndProcessChartData(null, "donut");
      expect(result).toHaveLength(0);
    });
  });

  describe("getProcessedChartData", () => {
    it("should get processed chart data", () => {
      const result = getProcessedChartData(
        mockDashboardData,
        "expenses",
        "donut"
      );

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ name: "Marketing", value: 15000 });
    });

    it("should handle null data", () => {
      const result = getProcessedChartData(null, "expenses", "donut");
      expect(result).toHaveLength(0);
    });
  });
});
