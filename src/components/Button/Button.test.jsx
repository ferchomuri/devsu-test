import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button";

test("renders a button with text", () => {
  const buttonText = "Click Me";
  render(<Button text={buttonText} />);
  const buttonElement = screen.getByText(buttonText);
  expect(buttonElement).toBeInTheDocument();
});

test("renders a primary button with yellow color and text", () => {
  const buttonText = "Click Me";
  render(<Button color='primary' text={buttonText} />);
  const buttonElement = screen.getByRole("button", { name: "Click Me" });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass("yellow-button");
});

test("renders a gray button by default and text", () => {
  render(<Button text='Click Me' />);
  const buttonElement = screen.getByRole("button", { name: "Click Me" });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass("gray-button");
});

test("calls the action function when clicked", () => {
  const mockAction = jest.fn();
  render(<Button text='Click Me' action={mockAction} />);
  const buttonElement = screen.getByText("Click Me");
  fireEvent.click(buttonElement);
  expect(mockAction).toHaveBeenCalled();
});

test("sets the button type to 'submit'", () => {
  render(<Button type='submit' text='Click Me' />);
  const buttonElement = screen.getByRole("button", { name: "Click Me" });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveAttribute("type", "submit");
});
