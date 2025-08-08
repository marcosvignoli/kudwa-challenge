import { MainDashboardData } from "@/types/data";

/**
 * Extract KPI data from dashboard data
 * @param data - MainDashboardData object
 * @returns Array of KPI data or empty array if not available
 */
export const extractKPIData = (data: MainDashboardData | null) => {
  if (!data?.mainDashboardKPIs?.topKPIs) return [];
  return data.mainDashboardKPIs.topKPIs;
};

/**
 * Extract chart data for a specific chart key
 * @param data - MainDashboardData object
 * @param chartKey - Key of the chart to extract
 * @returns Array of chart data or empty array if not available
 */
export const extractChartData = (
  data: MainDashboardData | null,
  chartKey: string
) => {
  if (!data?.mainDashboard?.charts?.[chartKey]) return [];
  return data.mainDashboard.charts[chartKey];
};

/**
 * Extract date array from dashboard data
 * @param data - MainDashboardData object
 * @returns Array of dates or empty array if not available
 */
export const extractDateArray = (data: MainDashboardData | null) => {
  return data?.mainDashboard?.dateArray || [];
};

/**
 * Process donut chart data for Recharts
 * @param chartData - Raw chart data from JSON
 * @returns Processed data suitable for Recharts PieChart
 */
export const processDonutChartData = (
  chartData: Array<{
    name: string;
    values: number | number[];
    chartType?: string;
  }>
) => {
  return chartData.map((item) => ({
    name: item.name,
    value: Array.isArray(item.values) ? item.values[0] || 0 : item.values,
  }));
};

/**
 * Process line chart data for Recharts
 * @param chartData - Raw chart data from JSON
 * @param dateArray - Array of dates for x-axis
 * @returns Processed data suitable for Recharts LineChart
 */
export const processLineChartData = (
  chartData: Array<{
    name: string;
    values: number[];
    chartType?: string;
  }>,
  dateArray: string[]
) => {
  if (!Array.isArray(chartData)) return [];

  return chartData
    .filter((series) => series && series.name && Array.isArray(series.values))
    .map((series) => ({
      name: series.name,
      values: series.values.map((value) => value || 0),
    }));
};

/**
 * Validate and process chart data with error handling
 * @param data - Raw chart data
 * @param chartType - Type of chart ('line', 'donut', 'bar')
 * @param dateArray - Optional date array for line charts
 * @returns Processed chart data or empty array if invalid
 */
export const validateAndProcessChartData = (
  data: unknown,
  chartType: "line" | "donut" | "bar" | "pie",
  dateArray?: string[]
) => {
  try {
    if (!Array.isArray(data)) return [];

    if (chartType === "donut" || chartType === "pie") {
      return processDonutChartData(
        data as Array<{
          name: string;
          values: number | number[];
          chartType?: string;
        }>
      );
    }

    if (chartType === "line" && dateArray) {
      return processLineChartData(
        data as Array<{
          name: string;
          values: number[];
          chartType?: string;
        }>,
        dateArray
      );
    }

    return data;
  } catch (error) {
    console.error(`Error processing ${chartType} chart data:`, error);
    return [];
  }
};

/**
 * Get chart data with proper processing
 * @param data - MainDashboardData object
 * @param chartKey - Key of the chart to extract
 * @param chartType - Type of chart
 * @returns Processed chart data
 */
export const getProcessedChartData = (
  data: MainDashboardData | null,
  chartKey: string,
  chartType: "line" | "donut" | "bar" | "pie"
) => {
  const rawData = extractChartData(data, chartKey);
  const dateArray = extractDateArray(data);

  return validateAndProcessChartData(rawData, chartType, dateArray);
};
