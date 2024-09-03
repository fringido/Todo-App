import React from "react";
import "./Header.css";
interface TodoCounterProps {
  totalTodos: number; // Número total de tareas
  completedTodos: number; // Número de tareas completadas
  loading: boolean; // Indica si los datos están cargando
}
export const Header: React.FC<TodoCounterProps> = ({
  totalTodos,
  completedTodos,
  loading,
}) => {
  return (
    <header className="header">
      <h1>
        TickT{""}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="header-icon"
        >
          <path
            fill="white"
            d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
          />
        </svg>
        {""}
        ckTasks
      </h1>
      <h2 className={`TodoCounter ${!!loading && "TodoCounter--loading"}`}>
        Has completado {completedTodos} de {totalTodos} Tasks
      </h2>
    </header>
  );
};
