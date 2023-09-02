import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MenuContext from "./MenuContext";

describe("MenuContext Component", () => {
  it("renders the menu button", () => {
    render(<MenuContext options={[]} />);
    const menuButton = screen.getByRole("button", { name: "Menu" });
    expect(menuButton).toBeInTheDocument();
  });

  it("does not initially render the menu options", () => {
    render(<MenuContext options={[]} />);
    const menuOptions = screen.queryByRole("menuitem");
    expect(menuOptions).toBeNull();
  });

  it("renders the menu options when the button is clicked", () => {
    const options = [
      { label: "Option 1", action: jest.fn() },
      { label: "Option 2", action: jest.fn() },
    ];
    render(<MenuContext options={options} />);
    const menuButton = screen.getByRole("button", { name: "Menu" });

    fireEvent.click(menuButton);

    const option1 = screen.getByText("Option 1");
    const option2 = screen.getByText("Option 2");

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it("calls the action when a menu option is clicked", () => {
    const mockAction = jest.fn();
    const options = [{ label: "Option 1", action: mockAction }];
    render(<MenuContext options={options} />);
    const menuButton = screen.getByRole("button", { name: "Menu" });

    fireEvent.click(menuButton);

    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    expect(mockAction).toHaveBeenCalled();
  });

  it("closes the menu when a menu option is clicked", () => {
    const options = [{ label: "Option 1", action: jest.fn() }];
    render(<MenuContext options={options} />);
    const menuButton = screen.getByRole("button", { name: "Menu" });

    fireEvent.click(menuButton);

    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    const menuOptions = screen.queryByRole("menuitem");
    expect(menuOptions).toBeNull();
  });

  it("closes the menu when clicking outside of the menu", () => {
    const options = [{ label: "Option 1", action: jest.fn() }];
    render(<MenuContext options={options} />);
    const menuButton = screen.getByRole("button", { name: "Menu" });

    fireEvent.click(menuButton);

    const outsideElement = screen.getByTestId("outside-element");
    fireEvent.click(outsideElement);

    const menuOptions = screen.queryByRole("menuitem");
    expect(menuOptions).toBeNull();
  });
});
