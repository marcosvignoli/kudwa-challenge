import React from "react";
import { render, screen } from "@testing-library/react";
import { MetricCard } from "../MetricCard";

describe("MetricCard", () => {
  const defaultProps = {
    title: "Total Revenue",
    value: "$500,000",
    subtitle: "Monthly revenue",
    change: "+15%",
    changeType: "positive" as const,
    icon: "💰",
  };

  it("should render with all props", () => {
    render(<MetricCard {...defaultProps} />);

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("$500,000")).toBeInTheDocument();
    expect(screen.getByText(/\+15%/)).toBeInTheDocument();
    expect(screen.getByText("💰")).toBeInTheDocument();
  });

  it("should render with positive change styling", () => {
    render(<MetricCard {...defaultProps} />);

    const changeElement = screen.getByText(/\+15%/);
    expect(changeElement).toHaveClass("text-green-600");
  });

  it("should render with negative change styling", () => {
    render(
      <MetricCard {...defaultProps} change="-10%" changeType="negative" />
    );

    const changeElement = screen.getByText(/-10%/);
    expect(changeElement).toHaveClass("text-red-600");
  });

  it("should render with neutral change styling", () => {
    render(<MetricCard {...defaultProps} change="0%" changeType="neutral" />);

    const changeElement = screen.getByText(/0%/);
    expect(changeElement).toHaveClass("text-gray-600");
  });

  it("should handle missing change prop", () => {
    const { change, changeType, ...propsWithoutChange } = defaultProps;

    render(<MetricCard {...propsWithoutChange} />);

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("$500,000")).toBeInTheDocument();
    expect(screen.queryByText("+15%")).not.toBeInTheDocument();
  });

  it("should handle missing icon prop", () => {
    const { icon, ...propsWithoutIcon } = defaultProps;

    render(<MetricCard {...propsWithoutIcon} />);

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("$500,000")).toBeInTheDocument();
    expect(screen.queryByText("💰")).not.toBeInTheDocument();
  });

  it("should handle large numbers and currency formatting", () => {
    render(<MetricCard {...defaultProps} value="$1,500,000" change="+25%" />);

    expect(screen.getByText("$1,500,000")).toBeInTheDocument();
    expect(screen.getByText(/\+25%/)).toBeInTheDocument();
  });

  it("should handle zero values", () => {
    render(
      <MetricCard
        {...defaultProps}
        value="$0"
        change="0%"
        changeType="neutral"
      />
    );

    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText(/0%/)).toBeInTheDocument();
  });
});
