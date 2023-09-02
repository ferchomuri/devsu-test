import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders the logo image with a valid src", () => {
  render(<Header />);
  const logoImageElement = screen.getByAltText("Logo Banco Pichincha");
  expect(logoImageElement).toBeInTheDocument();
  expect(logoImageElement).toHaveAttribute("src");
});
