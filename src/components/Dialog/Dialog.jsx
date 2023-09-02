import React from "react";

import Button from "../Button/Button";

import "./Dialog.css";

const ConfirmationDialog = ({ open, onClose, onConfirm, text }) => {
  return (
    <div className={`dialog ${open ? "open" : ""}`}>
      <div className='dialog-content' data-testid='dialog-content-container'>
        <p>{text}</p>
        <Button action={onConfirm} color='primary' text='Si' />
        <Button action={onClose} color='secondary' text='No' />
      </div>
    </div>
  );
};

export default ConfirmationDialog;
