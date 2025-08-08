import {
  processLineChartData,
  processDonutChartData,
  limitCategories,
  formatCurrency,
} from "../chartDataProcessor";

describe("chartDataProcessor", () => {
  describe("processLineChartData", () => {
    it("should process cash flow data correctly", () => {
      const mockData = [
        { month: "Jan", income: 50000, expenses: 30000, net: 20000 },
        { month: "Feb", income: 55000, expenses: 32000, net: 23000 },
        { month: "Mar", income: 60000, expenses: 35000, net: 25000 },
      ];

      const result = processLineChartData(mockData, "cashFlow");

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        name: "Jan",
        income: 50000,
        expenses: 30000,
        net: 20000,
      });
    });

    it("should process revenue data correctly", () => {
      const mockData = [
        { month: "Jan", amount: 50000 },
        { month: "Feb", amount: 55000 },
        { month: "Mar", amount: 60000 },
      ];

      const result = processLineChartData(mockData, "revenue");

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        name: "Jan",
        revenue: 50000,
      });
    });

    it("should handle empty data", () => {
      const result = processLineChartData([], "cashFlow");
      expect(result).toHaveLength(0);
    });
  });

  describe("processDonutChartData", () => {
    it("should process expense categories correctly", () => {
      const mockData = [
        { category: "Marketing", amount: 15000 },
        { category: "Operations", amount: 12000 },
        { category: "Technology", amount: 8000 },
        { category: "HR", amount: 5000 },
      ];

      const result = processDonutChartData(mockData);

      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({
        name: "Marketing",
        value: 15000,
      });
    });

    it("should limit categories to 8 and group others", () => {
      const mockData = [
        { category: "Category1", amount: 10000 },
        { category: "Category2", amount: 9000 },
        { category: "Category3", amount: 8000 },
        { category: "Category4", amount: 7000 },
        { category: "Category5", amount: 6000 },
        { category: "Category6", amount: 5000 },
        { category: "Category7", amount: 4000 },
        { category: "Category8", amount: 3000 },
        { category: "Category9", amount: 2000 },
        { category: "Category10", amount: 1000 },
      ];

      const result = processDonutChartData(mockData);

      expect(result).toHaveLength(9); // 8 categories + "Others"
      expect(result[8]).toEqual({
        name: "Others",
        value: 3000, // Category9 + Category10
      });
    });

    it("should handle empty data", () => {
      const result = processDonutChartData([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("limitCategories", () => {
    it("should limit categories to specified number", () => {
      const mockData = [
        { category: "A", amount: 100 },
        { category: "B", amount: 90 },
        { category: "C", amount: 80 },
        { category: "D", amount: 70 },
        { category: "E", amount: 60 },
      ];

      const result = limitCategories(mockData, 3);

      expect(result).toHaveLength(4); // 3 categories + "Others"
      expect(result[0].category).toBe("A");
      expect(result[1].category).toBe("B");
      expect(result[2].category).toBe("C");
      expect(result[3].category).toBe("Others");
      expect(result[3].amount).toBe(130); // D + E
    });

    it("should handle data with fewer items than limit", () => {
      const mockData = [
        { category: "A", amount: 100 },
        { category: "B", amount: 90 },
      ];

      const result = limitCategories(mockData, 5);

      expect(result).toHaveLength(2);
      expect(result[0].category).toBe("A");
      expect(result[1].category).toBe("B");
    });
  });

  describe("formatCurrency", () => {
    it("should format numbers as currency", () => {
      expect(formatCurrency(1000)).toBe("$1,000");
      expect(formatCurrency(1500000)).toBe("$1,500,000");
      expect(formatCurrency(0)).toBe("$0");
    });

    it("should handle negative numbers", () => {
      expect(formatCurrency(-1000)).toBe("-$1,000");
    });

    it("should handle decimal numbers", () => {
      expect(formatCurrency(1000.5)).toBe("$1,000.50");
    });
  });
});
