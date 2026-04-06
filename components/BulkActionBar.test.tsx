import { render, screen, fireEvent } from "@testing-library/react";
import { BulkActionBar } from "./BulkActionBar";
import { useSelectionStore } from "@/store/useSelectionStore";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

// Mock the store
vi.mock("@/store/useSelectionStore", () => ({
  useSelectionStore: vi.fn(),
}));

// Mock icons to avoid "Element type is invalid" if they are not resolved
vi.mock("@hugeicons/react", () => ({
  ArchiveIcon: () => <div data-testid="archive-icon" />,
  Delete02Icon: () => <div data-testid="delete-icon" />,
  ViewIcon: () => <div data-testid="view-icon" />,
  Cancel01Icon: () => <div data-testid="cancel-icon" />,
}));

describe("BulkActionBar", () => {
  const clearSelection = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not render when no repos are selected", () => {
    (useSelectionStore as any).mockReturnValue({
      selectedRepoIds: [],
      clearSelection,
    });

    const { container } = render(<BulkActionBar />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render when repos are selected", () => {
    (useSelectionStore as any).mockReturnValue({
      selectedRepoIds: ["1", "2"],
      clearSelection,
    });

    render(<BulkActionBar />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Selected")).toBeInTheDocument();
    expect(screen.getByText("Visibility")).toBeInTheDocument();
    expect(screen.getByText("Archive")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should call clearSelection when clear button is clicked", () => {
    (useSelectionStore as any).mockReturnValue({
      selectedRepoIds: ["1"],
      clearSelection,
    });

    render(<BulkActionBar />);
    const clearButton = screen.getByRole("button", { name: /clear selection/i });
    fireEvent.click(clearButton);

    expect(clearSelection).toHaveBeenCalledTimes(1);
  });
});
