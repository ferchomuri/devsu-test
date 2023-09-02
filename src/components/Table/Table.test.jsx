import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";
import { MemoryRouter } from "react-router-dom";

// Mock de useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock de la función deleteProduct
jest.mock("../../brigde/GeneralRequest", () => ({
  deleteProduct: jest.fn(),
}));

test("renders an empty table", () => {
  const data = [];
  const showColumns = [];

  render(
    <MemoryRouter>
      <Table data={data} showColums={showColumns} />
    </MemoryRouter>
  );

  // Verificar que la tabla esté presente
  const tableElement = screen.getByRole("table");
  expect(tableElement).toBeInTheDocument();

  // Verificar que no haya datos visibles
  expect(screen.queryByText(/Resultados/)).toBeNull();
});

test("renders a table with data", () => {
  const data = [
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      date_release: "2023-08-31",
      date_revision: "2023-08-31",
      logo: "logo1.png",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      date_release: "2023-08-31",
      date_revision: "2023-08-31",
      logo: "logo2.png",
    },
  ];
  const showColumns = [
    { name: "logo", label: "Logo" },
    { name: "name", label: "Name" },
    { name: "description", label: "Description" },
    { name: "date_release", label: "Release Date" },
    { name: "date_revision", label: "Revision Date" },
  ];

  render(
    <MemoryRouter>
      <Table data={data} showColums={showColumns} />
    </MemoryRouter>
  );

  // Verificar que los datos se muestren en la tabla
  expect(screen.getByText("Product 1")).toBeInTheDocument();
  expect(screen.getByText("Product 2")).toBeInTheDocument();
});
