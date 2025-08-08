import reportSlice, {
  fetchReportData,
  fetchReportDataFulfilled,
  fetchReportDataRejected,
} from "../reportSlice";

describe("reportSlice", () => {
  const initialState = {
    data: null,
    loading: false,
    error: null,
  };

  it("should return initial state", () => {
    const state = reportSlice(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  it("should handle fetchReportData pending", () => {
    const state = reportSlice(initialState, fetchReportData.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle fetchReportData fulfilled", () => {
    const mockData = {
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
      ],
      keyMetrics: {
        customerAcquisitionCost: 150,
        customerLifetimeValue: 2500,
        churnRate: 5,
        averageOrderValue: 500,
      },
    };

    const state = reportSlice(
      { ...initialState, loading: true },
      fetchReportData.fulfilled(mockData, "requestId", "monthly")
    );

    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockData);
    expect(state.error).toBe(null);
  });

  it("should handle fetchReportData rejected", () => {
    const errorMessage = "Failed to fetch report data";
    const state = reportSlice(
      { ...initialState, loading: true },
      fetchReportData.rejected(
        new Error(errorMessage),
        "requestId",
        "monthly",
        errorMessage
      )
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.data).toBe(null);
  });

  it("should handle fetchReportDataFulfilled action", () => {
    const mockData = {
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
      revenueBreakdown: [],
      expenseBreakdown: [],
      keyMetrics: {
        customerAcquisitionCost: 150,
        customerLifetimeValue: 2500,
        churnRate: 5,
        averageOrderValue: 500,
      },
    };

    const state = reportSlice(initialState, fetchReportDataFulfilled(mockData));
    expect(state.data).toEqual(mockData);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("should handle fetchReportDataRejected action", () => {
    const errorMessage = "Report data not available";
    const state = reportSlice(
      initialState,
      fetchReportDataRejected(errorMessage)
    );
    expect(state.error).toBe(errorMessage);
    expect(state.loading).toBe(false);
    expect(state.data).toBe(null);
  });
});
