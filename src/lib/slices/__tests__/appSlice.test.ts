import appSlice, { setPeriod } from "../appSlice";

describe("appSlice", () => {
  const initialState = {
    period: "monthly" as const,
    loading: false,
    error: null,
  };

  it("should return initial state", () => {
    const state = appSlice(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  it("should handle setPeriod action", () => {
    const state = appSlice(initialState, setPeriod("quarterly"));
    expect(state.period).toBe("quarterly");
  });

  it("should handle setPeriod action for yearly", () => {
    const state = appSlice(initialState, setPeriod("yearly"));
    expect(state.period).toBe("yearly");
  });

  it("should handle setPeriod action for monthly", () => {
    const state = appSlice({ period: "quarterly" }, setPeriod("monthly"));
    expect(state.period).toBe("monthly");
  });

  it("should not change state for unknown action", () => {
    const state = appSlice(initialState, { type: "unknown" });
    expect(state).toEqual(initialState);
  });
});
