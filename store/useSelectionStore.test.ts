import { describe, it, expect, beforeEach } from "vitest";
import { useSelectionStore } from "./useSelectionStore";

describe("useSelectionStore", () => {
  beforeEach(() => {
    useSelectionStore.getState().clearSelection();
  });

  it("should start with an empty selection", () => {
    expect(useSelectionStore.getState().selectedRepoIds).toEqual([]);
  });

  it("should add a repo id", () => {
    useSelectionStore.getState().addRepoId("1");
    expect(useSelectionStore.getState().selectedRepoIds).toEqual(["1"]);
  });

  it("should not add duplicate repo ids", () => {
    useSelectionStore.getState().addRepoId("1");
    useSelectionStore.getState().addRepoId("1");
    expect(useSelectionStore.getState().selectedRepoIds).toEqual(["1"]);
  });

  it("should remove a repo id", () => {
    useSelectionStore.getState().addRepoId("1");
    useSelectionStore.getState().addRepoId("2");
    useSelectionStore.getState().removeRepoId("1");
    expect(useSelectionStore.getState().selectedRepoIds).toEqual(["2"]);
  });

  it("should toggle a repo id", () => {
    useSelectionStore.getState().toggleRepoId("1");
    expect(useSelectionStore.getState().selectedRepoIds).toEqual(["1"]);
    useSelectionStore.getState().toggleRepoId("1");
    expect(useSelectionStore.getState().selectedRepoIds).toEqual([]);
  });

  it("should add multiple repo ids", () => {
    useSelectionStore.getState().addRepoIds(["1", "2", "3"]);
    expect(useSelectionStore.getState().selectedRepoIds).toEqual(["1", "2", "3"]);
  });

  it("should add only non-duplicate multiple repo ids", () => {
    useSelectionStore.getState().addRepoId("1");
    useSelectionStore.getState().addRepoIds(["1", "2", "3"]);
    expect(useSelectionStore.getState().selectedRepoIds).toEqual(["1", "2", "3"]);
  });

  it("should remove multiple repo ids", () => {
    useSelectionStore.getState().addRepoIds(["1", "2", "3"]);
    useSelectionStore.getState().removeRepoIds(["1", "3"]);
    expect(useSelectionStore.getState().selectedRepoIds).toEqual(["2"]);
  });

  it("should clear selection", () => {
    useSelectionStore.getState().addRepoId("1");
    useSelectionStore.getState().clearSelection();
    expect(useSelectionStore.getState().selectedRepoIds).toEqual([]);
  });
});
