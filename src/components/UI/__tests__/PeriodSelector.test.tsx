import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PeriodSelector from "../PeriodSelector";
import appSlice from "@/lib/slices/appSlice";

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      app: appSlice,
    },
    preloadedState: {
      app: {
        period: "monthly",
        ...initialState,
      },
    },
  });
};

describe("PeriodSelector", () => {
  it("should render all period options", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <PeriodSelector />
      </Provider>
    );

    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText("Quarterly")).toBeInTheDocument();
    expect(screen.getByText("Yearly")).toBeInTheDocument();
  });

  it("should show current period as active", () => {
    const store = createTestStore({ period: "quarterly" });

    render(
      <Provider store={store}>
        <PeriodSelector />
      </Provider>
    );

    const quarterlyButton = screen.getByText("Quarterly").closest("button");
    expect(quarterlyButton).toHaveClass("bg-[#B09280]");
  });

  it("should dispatch period change when clicked", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <PeriodSelector />
      </Provider>
    );

    const yearlyButton = screen.getByText("Yearly");
    fireEvent.click(yearlyButton);

    const state = store.getState();
    expect(state.app.period).toBe("yearly");
  });

  it("should have correct styling for active and inactive states", () => {
    const store = createTestStore({ period: "monthly" });

    render(
      <Provider store={store}>
        <PeriodSelector />
      </Provider>
    );

    const monthlyButton = screen.getByText("Monthly").closest("button");
    const quarterlyButton = screen.getByText("Quarterly").closest("button");

    expect(monthlyButton).toHaveClass("bg-[#B09280]");
    expect(quarterlyButton).toHaveClass("bg-white");
  });

  it("should be accessible with proper ARIA labels", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <PeriodSelector />
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-label");
    });
  });
});
