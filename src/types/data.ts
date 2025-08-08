export interface ChartData {
  chartType: "line" | "bar" | "area";
  name: string;
  values: number[];
}

export interface KPIData {
  name: string;
  value: number;
  date?: string;
  mOm?: number;
  type?: string;
}

export interface MainDashboardData {
  mainDashboard: {
    period: "monthly" | "quarterly" | "yearly";
    startDate: string;
    endDate: string;
    metricDate: string;
    dateArray: string[];
    charts: {
      [key: string]: ChartData[];
    };
  };
  mainDashboardKPIs: {
    topKPIs: KPIData[];
    KPIs: KPIData[];
  };
}

export type PeriodType = "monthly" | "quarterly" | "yearly";

export interface DashboardState {
  currentPeriod: PeriodType;
  data: MainDashboardData | null;
  loading: boolean;
  error: string | null;
}

// Report Data Interfaces
export interface ReportActualData {
  id: number;
  topLevelFieldId: number | null;
  fieldId: number;
  value: number[];
  codatAccountId: string;
  integrationSourceId: number;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportField {
  id: number;
  topLevelFieldId: number;
  name: string;
  code: string | null;
  uniqueReference: {
    sheetType: string;
    integrationSourceId: number;
    sourceType: string;
    accountId: string;
    accountName: string;
    metric: boolean;
  };
  order: number | null;
  description: string | null;
  style: string | null;
  fieldType: string | null;
  createdAt: string;
  updatedAt: string;
  fieldId: number | null;
  outputs: unknown[];
  actualData: ReportActualData[];
}

export interface ReportProfitLossItem {
  id: number;
  financialReportId: number;
  name: string;
  type: string;
  description: string | null;
  style: string | null;
  createdAt: string;
  updatedAt: string;
  outputs: unknown[];
  actualData: ReportActualData[];
  fields: ReportField[];
  pastMonth: unknown;
  quarterly: unknown;
  quarterlyPastMonth: unknown;
  quarterlyResult: unknown;
  result: unknown;
  totalResult: unknown;
  yearly: unknown;
  yearlyPastMonth: unknown;
  yearlyResult: unknown;
}

export interface ReportData {
  reportResult: {
    id: number;
    scenarioId: number;
    startingDate: string;
    endingDate: string;
    createdAt: string;
    updatedAt: string;
    profitnLoss: ReportProfitLossItem[];
    metrics: Record<string, unknown>;
    computedFields: unknown[];
  };
}

export interface ReportState {
  currentPeriod: PeriodType;
  data: ReportData | null;
  loading: boolean;
  error: string | null;
  expandedSections: string[];
}
