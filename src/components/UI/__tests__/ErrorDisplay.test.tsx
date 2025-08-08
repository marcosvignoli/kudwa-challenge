import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorDisplay } from "../ErrorDisplay";

describe("ErrorDisplay", () => {
  const defaultProps = {
    message: "Something went wrong",
    onRetry: jest.fn(),
  };

  it("should render with error message", () => {
    render(<ErrorDisplay {...defaultProps} />);

    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    expect(screen.getByText("⚠️")).toBeInTheDocument();
  });

  it("should render with custom title", () => {
    render(<ErrorDisplay {...defaultProps} title="Custom Error" />);

    expect(screen.getByText(/Custom Error/)).toBeInTheDocument();
  });

  it("should call onRetry when retry button is clicked", () => {
    const mockOnRetry = jest.fn();
    render(<ErrorDisplay {...defaultProps} onRetry={mockOnRetry} />);

    const retryButton = screen.getByText("Try Again");
    fireEvent.click(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it("should not show retry button when onRetry is not provided", () => {
    const { onRetry, ...propsWithoutRetry } = defaultProps;
    render(<ErrorDisplay {...propsWithoutRetry} />);

    expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
  });

  it("should have proper accessibility attributes", () => {
    render(<ErrorDisplay {...defaultProps} />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("should handle empty message", () => {
    render(<ErrorDisplay {...defaultProps} message="" />);

    expect(screen.getByText("⚠️")).toBeInTheDocument();
    expect(screen.queryByText("")).not.toBeInTheDocument();
  });

  it("should render with different error types", () => {
    render(<ErrorDisplay {...defaultProps} type="network" />);

    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });

  it("should handle long error messages", () => {
    const longMessage =
      "This is a very long error message that should be handled properly by the component without breaking the layout or causing any visual issues";
    render(<ErrorDisplay {...defaultProps} message={longMessage} />);

    expect(
      screen.getByText(/This is a very long error message/)
    ).toBeInTheDocument();
  });
});
