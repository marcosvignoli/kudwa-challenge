import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import dashboardReducer from "./slices/dashboardSlice";
import reportReducer from "./slices/reportSlice";
import uiReducer from "./slices/uiSlice";

/**
 * Redux Store Configuration
 *
 * Centralized state management using Redux Toolkit.
 * Features:
 * - Type-safe state management with TypeScript
 * - Async thunks for data loading
 * - Immutable state updates with Immer
 * - DevTools integration for debugging
 * - Optimized for performance with proper selectors
 * - UI state management across the application
 */
export const store = configureStore({
  reducer: {
    app: appReducer,
    dashboard: dashboardReducer,
    report: reportReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
