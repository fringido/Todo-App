import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
  children: React.ReactNode; // Los hijos pueden ser cualquier nodo React
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="ModalBackground">{children}</div>,
    document.getElementById("modal") as HTMLElement // Asegúrate de que el elemento existe y es del tipo HTMLElement
  );
};

export { Modal };
