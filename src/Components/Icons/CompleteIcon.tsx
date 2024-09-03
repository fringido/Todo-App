import React from "react";
import { TodoIcon } from ".";

// Define la interfaz para las props del componente CompleteIcon
interface CompleteIconProps {
  completed: boolean; // Estado de completado del ítem
  onComplete: () => void; // Función a ejecutar cuando se completa el ítem
}

// Define el componente CompleteIcon con la interfaz CompleteIconProps
const CompleteIcon: React.FC<CompleteIconProps> = ({
  completed,
  onComplete,
}) => {
  return (
    <TodoIcon
      type="check"
      color={completed ? "#4caf50" : "gray"}
      onClick={onComplete}
    />
  );
};

export { CompleteIcon };
