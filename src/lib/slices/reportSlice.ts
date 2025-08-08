import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loadReportData } from "../data";
import { ReportData } from "@/types/data";

interface ReportState {
  data: ReportData | null;
  loading: boolean;
  error: string | null;
  expandedSections: string[];
}

const initialState: ReportState = {
  data: null,
  loading: false,
  error: null,
  expandedSections: [],
};

// Async thunk for loading report data
export const fetchReportData = createAsyncThunk(
  "report/fetchData",
  async () => {
    const data = await loadReportData();
    return data;
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearReportData: (state) => {
      state.data = null;
      state.error = null;
    },
    setReportError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    toggleSection: (state, action: PayloadAction<string>) => {
      const section = action.payload;
      if (state.expandedSections.includes(section)) {
        state.expandedSections = state.expandedSections.filter(
          (s) => s !== section
        );
      } else {
        state.expandedSections.push(section);
      }
    },
    expandAllSections: (state) => {
      state.expandedSections = [
        "summary",
        "cashFlow",
        "revenue",
        "expenses",
        "profitability",
      ];
    },
    collapseAllSections: (state) => {
      state.expandedSections = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchReportData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load report data";
      });
  },
});

export const {
  clearReportData,
  setReportError,
  toggleSection,
  expandAllSections,
  collapseAllSections,
} = reportSlice.actions;
export default reportSlice.reducer;
