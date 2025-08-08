import { MainDashboardData, ReportData } from "@/types/data";

// Standard chart data interface
export interface ChartDataItem {
  name: string;
  values: number[];
  chartType?: string;
}

export interface ProcessedChartData {
  name: string;
  value: number;
}

export interface ProcessedLineChartData {
  name: string;
  values: number[];
}

/**
 * Standardized chart data processor that works for both dashboard and report data
 */
export class ChartDataProcessor {
  /**
   * Process donut chart data with category limiting
   */
  static processDonutChartData(
    data: ChartDataItem[],
    maxCategories: number = 8
  ): ProcessedChartData[] {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Calculate totals for each category
    const categoriesWithTotals = data.map((item) => {
      let total = 0;

      // Handle different data structures
      if (Array.isArray(item.values)) {
        // For dashboard data: sum all values in the array
        total = item.values.reduce((sum, val) => sum + (val || 0), 0);
      } else if (typeof item.values === "number") {
        // For single number values
        total = item.values;
      } else {
        // Fallback
        total = 0;
      }

      return {
        name: item.name,
        total: total,
        originalData: item,
      };
    });

    // Filter out categories with zero totals
    const nonZeroCategories = categoriesWithTotals.filter(
      (item) => item.total > 0
    );

    if (nonZeroCategories.length === 0) {
      return [];
    }

    // If we have 8 or fewer categories, return as is
    if (nonZeroCategories.length <= maxCategories) {
      return nonZeroCategories.map((item) => ({
        name: item.name,
        value: item.total,
      }));
    }

    // Sort by total value (descending) and limit to maxCategories - 1
    nonZeroCategories.sort((a, b) => b.total - a.total);
    const topCategories = nonZeroCategories.slice(0, maxCategories - 1);
    const remainingCategories = nonZeroCategories.slice(maxCategories - 1);

    // Create "Others" category from remaining categories
    if (remainingCategories.length > 0) {
      const othersTotal = remainingCategories.reduce(
        (sum, item) => sum + item.total,
        0
      );

      topCategories.push({
        name: "Others",
        total: othersTotal,
        originalData: remainingCategories[0].originalData, // Keep structure for compatibility
      });
    }

    return topCategories.map((item) => ({
      name: item.name,
      value: item.total,
    }));
  }

  /**
   * Process line chart data with category limiting
   */
  static processLineChartData(
    data: ChartDataItem[],
    dateArray: string[] = [],
    maxCategories: number = 8
  ): ProcessedLineChartData[] {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Calculate totals for each category to determine which to keep
    const categoriesWithTotals = data.map((item) => {
      let total = 0;

      if (Array.isArray(item.values)) {
        total = item.values.reduce((sum, val) => sum + (val || 0), 0);
      } else if (typeof item.values === "number") {
        total = item.values;
      }

      return {
        name: item.name,
        total: total,
        originalData: item,
      };
    });

    // Filter out categories with zero totals
    const nonZeroCategories = categoriesWithTotals.filter(
      (item) => item.total > 0
    );

    if (nonZeroCategories.length === 0) {
      return [];
    }

    // If we have 8 or fewer categories, return as is
    if (nonZeroCategories.length <= maxCategories) {
      return nonZeroCategories
        .filter(
          (item) =>
            item &&
            item.originalData.name &&
            Array.isArray(item.originalData.values)
        )
        .map((item) => ({
          name: item.originalData.name,
          values: item.originalData.values.map((value) => value || 0),
        }));
    }

    // Sort by total value (descending) and limit to maxCategories - 1
    nonZeroCategories.sort((a, b) => b.total - a.total);
    const topCategories = nonZeroCategories.slice(0, maxCategories - 1);
    const remainingCategories = nonZeroCategories.slice(maxCategories - 1);

    // Create "Others" category from remaining categories
    if (remainingCategories.length > 0) {
      const othersValues = dateArray.map((_, index) =>
        remainingCategories.reduce(
          (sum, item) => sum + (item.originalData.values[index] || 0),
          0
        )
      );

      topCategories.push({
        name: "Others",
        total: othersValues.reduce((sum, val) => sum + val, 0),
        originalData: {
          name: "Others",
          values: othersValues,
          chartType: "line",
        },
      });
    }

    return topCategories
      .filter(
        (item) =>
          item &&
          item.originalData.name &&
          Array.isArray(item.originalData.values)
      )
      .map((item) => ({
        name: item.originalData.name,
        values: item.originalData.values.map((value) => value || 0),
      }));
  }

  /**
   * Extract chart data from dashboard data
   */
  static extractDashboardChartData(
    data: MainDashboardData | null,
    chartKey: string
  ): ChartDataItem[] {
    if (!data?.mainDashboard?.charts?.[chartKey]) return [];
    return data.mainDashboard.charts[chartKey];
  }

  /**
   * Extract chart data from report data
   */
  static extractReportChartData(
    data: ReportData | null,
    categoryName: string,
    period: "monthly" | "quarterly" | "yearly" = "monthly"
  ): ChartDataItem[] {
    if (!data?.reportResult?.profitnLoss) return [];

    const category = data.reportResult.profitnLoss.find(
      (item) => item.name === categoryName
    );

    if (!category || !category.fields || category.fields.length === 0) {
      return [];
    }

    // Process report data to match dashboard format
    return category.fields.map((field) => ({
      name: field.name,
      values: field.actualData[0]?.value || [],
      chartType: "line",
    }));
  }

  /**
   * Get processed donut chart data for dashboard
   */
  static getDashboardDonutChartData(
    data: MainDashboardData | null,
    chartKey: string,
    maxCategories: number = 8
  ): ProcessedChartData[] {
    const rawData = this.extractDashboardChartData(data, chartKey);
    return this.processDonutChartData(rawData, maxCategories);
  }

  /**
   * Get processed donut chart data for report
   */
  static getReportDonutChartData(
    data: ReportData | null,
    categoryName: string,
    period: "monthly" | "quarterly" | "yearly" = "monthly",
    maxCategories: number = 8
  ): ProcessedChartData[] {
    const rawData = this.extractReportChartData(data, categoryName, period);
    return this.processDonutChartData(rawData, maxCategories);
  }

  /**
   * Get processed line chart data for dashboard
   */
  static getDashboardLineChartData(
    data: MainDashboardData | null,
    chartKey: string
  ): ProcessedLineChartData[] {
    const rawData = this.extractDashboardChartData(data, chartKey);
    const dateArray = data?.mainDashboard?.dateArray || [];
    return this.processLineChartData(rawData, dateArray, 8);
  }

  /**
   * Get processed line chart data for report
   */
  static getReportLineChartData(
    data: ReportData | null,
    categoryName: string,
    period: "monthly" | "quarterly" | "yearly" = "monthly"
  ): ProcessedLineChartData[] {
    const rawData = this.extractReportChartData(data, categoryName, period);
    // Generate date array for report data
    const dateArray = this.generateReportDateArray(data, period);
    return this.processLineChartData(rawData, dateArray, 8);
  }

  /**
   * Generate date array for report data
   */
  static generateReportDateArray(
    data: ReportData | null,
    period: "monthly" | "quarterly" | "yearly"
  ): string[] {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateArray: string[] = [];
    const startYear = 2024;
    const endYear = 2025;

    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        dateArray.push(`${months[month]} ${year}`);
      }
    }

    return dateArray;
  }
}
