import dashboardSlice, {
  fetchDashboardData,
  fetchDashboardDataFulfilled,
  fetchDashboardDataRejected,
} from "../dashboardSlice";

describe("dashboardSlice", () => {
  const initialState = {
    data: null,
    loading: false,
    error: null,
  };

  it("should return initial state", () => {
    const state = dashboardSlice(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  it("should handle fetchDashboardData pending", () => {
    const state = dashboardSlice(initialState, fetchDashboardData.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle fetchDashboardData fulfilled", () => {
    const mockData = {
      cashFlow: [{ month: "Jan", income: 50000, expenses: 30000, net: 20000 }],
      revenue: [{ month: "Jan", amount: 50000 }],
      expenses: [{ month: "Jan", amount: 30000 }],
    };

    const state = dashboardSlice(
      { ...initialState, loading: true },
      fetchDashboardData.fulfilled(mockData, "requestId", "monthly")
    );

    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockData);
    expect(state.error).toBe(null);
  });

  it("should handle fetchDashboardData rejected", () => {
    const errorMessage = "Failed to fetch data";
    const state = dashboardSlice(
      { ...initialState, loading: true },
      fetchDashboardData.rejected(
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

  it("should handle fetchDashboardDataFulfilled action", () => {
    const mockData = {
      cashFlow: [{ month: "Jan", income: 50000, expenses: 30000, net: 20000 }],
      revenue: [{ month: "Jan", amount: 50000 }],
      expenses: [{ month: "Jan", amount: 30000 }],
    };

    const state = dashboardSlice(
      initialState,
      fetchDashboardDataFulfilled(mockData)
    );
    expect(state.data).toEqual(mockData);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("should handle fetchDashboardDataRejected action", () => {
    const errorMessage = "Network error";
    const state = dashboardSlice(
      initialState,
      fetchDashboardDataRejected(errorMessage)
    );
    expect(state.error).toBe(errorMessage);
    expect(state.loading).toBe(false);
    expect(state.data).toBe(null);
  });
});
