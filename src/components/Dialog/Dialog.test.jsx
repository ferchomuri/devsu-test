import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ConfirmationDialog from "./Dialog";

describe("ConfirmationDialog Component", () => {
  test("renders dialog with text", () => {
    const text = "Are you sure?";
    const { getByText } = render(
      <ConfirmationDialog
        open={true}
        text={text}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );
    const dialogElement = screen.getByText(text);
    expect(dialogElement).toBeInTheDocument();
  });

  test("calls onClose when 'No' button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <ConfirmationDialog
        open={true}
        text='Are you sure?'
        onClose={onCloseMock}
        onConfirm={() => {}}
      />
    );
    const noButtonElement = screen.getByText("No");
    fireEvent.click(noButtonElement);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("calls onConfirm when 'Si' button is clicked", () => {
    const onConfirmMock = jest.fn();
    render(
      <ConfirmationDialog
        open={true}
        text='Are you sure?'
        onClose={() => {}}
        onConfirm={onConfirmMock}
      />
    );
    const yesButtonElement = screen.getByText("Si");
    fireEvent.click(yesButtonElement);
    expect(onConfirmMock).toHaveBeenCalled();
  });

  test("does not render when open is false", () => {
    render(
      <ConfirmationDialog
        open={false}
        text='Are you sure?'
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );
    const dialogContent = screen.queryByTestId("dialog-content");
    expect(dialogContent).not.toBeInTheDocument();
  });
});
