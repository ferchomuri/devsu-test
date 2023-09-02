import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Search from "./Search";

describe("Search Component", () => {
  it("renders a search input", () => {
    render(<Search text='Search...' action={() => {}} />);
    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  it("calls the action function on input change", () => {
    const mockAction = jest.fn();
    render(<Search text='Search...' action={mockAction} />);
    const searchInput = screen.getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(mockAction).toHaveBeenCalled();
  });

  it("displays the entered text in the input", () => {
    render(<Search text='Search...' action={() => {}} />);
    const searchInput = screen.getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput.value).toBe("test");
  });
});
