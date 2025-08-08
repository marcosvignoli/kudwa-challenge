import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return "/";
  },
}));

// Mock Recharts to avoid canvas issues in tests
jest.mock("recharts", () => ({
  LineChart: ({ children, ...props }) => (
    <div data-testid="line-chart" {...props}>
      {children}
    </div>
  ),
  Line: ({ ...props }) => <div data-testid="line" {...props} />,
  DonutChart: ({ children, ...props }) => (
    <div data-testid="donut-chart" {...props}>
      {children}
    </div>
  ),
  Pie: ({ ...props }) => <div data-testid="pie" {...props} />,
  Cell: ({ ...props }) => <div data-testid="cell" {...props} />,
  ResponsiveContainer: ({ children, ...props }) => (
    <div data-testid="responsive-container" {...props}>
      {children}
    </div>
  ),
  XAxis: ({ ...props }) => <div data-testid="x-axis" {...props} />,
  YAxis: ({ ...props }) => <div data-testid="y-axis" {...props} />,
  CartesianGrid: ({ ...props }) => (
    <div data-testid="cartesian-grid" {...props} />
  ),
  Tooltip: ({ ...props }) => <div data-testid="tooltip" {...props} />,
  Legend: ({ ...props }) => <div data-testid="legend" {...props} />,
}));

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));
