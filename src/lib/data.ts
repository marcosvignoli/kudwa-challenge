import { MainDashboardData, PeriodType } from '@/types/data';

// Load dashboard data from JSON files
export const loadDashboardData = async (period: PeriodType): Promise<MainDashboardData> => {
  try {
    const data = await import(`../../Main Dashboard/${period}.json`);
    return data.default;
  } catch (error) {
    console.error(`Failed to load ${period} data:`, error);
    throw new Error(`Failed to load ${period} data`);
  }
};

// Load report data
export const loadReportData = async () => {
  try {
    const data = await import(`../../Report/report.json`);
    return data.default;
  } catch (error) {
    console.error('Failed to load report data:', error);
    throw new Error('Failed to load report data');
  }
};

// Format currency values
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Process chart data for Recharts
export const processChartData = (chartData: any[], dateArray: string[]) => {
  return chartData.map(series => ({
    ...series,
    data: dateArray.map((date, index) => ({
      date,
      value: series.values[index]
    }))
  }));
};

// Validate chart data
export const validateChartData = (data: any): boolean => {
  return data && 
         data.mainDashboard && 
         data.mainDashboard.charts && 
         Array.isArray(data.mainDashboard.dateArray);
};

// Safe data loading with error handling
export const loadDataSafely = async (period: PeriodType) => {
  try {
    const data = await loadDashboardData(period);
    return { success: true, data };
  } catch (error) {
    console.error(`Failed to load ${period} data:`, error);
    return { success: false, error: `Failed to load ${period} data` };
  }
};
