import React from "react";
import "./TabButton.css";

// Define la interfaz para las props del componente
interface TabButtonProps {
  vista: boolean; // Propiedad que determina la vista actual
}

// Componente funcional de React con TypeScript
export const TabButton: React.FC<TabButtonProps> = ({ vista }) => {
  return (
    <button className="button-tap">
      {vista ? <span>Progreso</span> : <span>Tasks</span>}
    </button>
  );
};
