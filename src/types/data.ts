export interface ChartData {
  chartType: 'line' | 'bar' | 'area';
  name: string;
  values: number[];
}

export interface MainDashboardData {
  mainDashboard: {
    period: 'monthly' | 'quarterly' | 'yearly';
    startDate: string;
    endDate: string;
    metricDate: string;
    dateArray: string[];
    charts: {
      [key: string]: ChartData[];
    };
  };
}

export interface FinancialMetrics {
  cashAtBank: ChartData[];
  revenue: ChartData[];
  expenses: ChartData[];
  profit: ChartData[];
  // Additional metrics as per JSON structure
}

export type PeriodType = 'monthly' | 'quarterly' | 'yearly';

export interface DashboardState {
  currentPeriod: PeriodType;
  data: MainDashboardData | null;
  loading: boolean;
  error: string | null;
}

export interface ReportData {
  // Will be defined based on report.json structure
  [key: string]: any;
}
