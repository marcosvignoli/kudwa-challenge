import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  expandedSections: string[];
  expandedCards: string[];
  activeTab: string;
  lastVisitedPeriod: "monthly" | "quarterly" | "yearly";
}

const initialState: UIState = {
  sidebarOpen: true,
  mobileMenuOpen: false,
  expandedSections: [],
  expandedCards: [],
  activeTab: "dashboard",
  lastVisitedPeriod: "monthly",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    toggleExpandedSection: (state, action: PayloadAction<string>) => {
      const section = action.payload;
      if (state.expandedSections.includes(section)) {
        state.expandedSections = state.expandedSections.filter(
          (s) => s !== section
        );
      } else {
        state.expandedSections.push(section);
      }
    },
    setExpandedSections: (state, action: PayloadAction<string[]>) => {
      state.expandedSections = action.payload;
    },
    toggleExpandedCard: (state, action: PayloadAction<string>) => {
      const card = action.payload;
      if (state.expandedCards.includes(card)) {
        state.expandedCards = state.expandedCards.filter((c) => c !== card);
      } else {
        state.expandedCards.push(card);
      }
    },
    setExpandedCards: (state, action: PayloadAction<string[]>) => {
      state.expandedCards = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setLastVisitedPeriod: (
      state,
      action: PayloadAction<"monthly" | "quarterly" | "yearly">
    ) => {
      state.lastVisitedPeriod = action.payload;
    },
    resetUI: (state) => {
      state.mobileMenuOpen = false;
      state.expandedSections = [];
      state.expandedCards = [];
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleExpandedSection,
  setExpandedSections,
  toggleExpandedCard,
  setExpandedCards,
  setActiveTab,
  setLastVisitedPeriod,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;
