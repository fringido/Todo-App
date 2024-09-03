import React from "react";
import { TodoIcon } from ".";

interface DeleteIconProps {
  onDelete?: () => void; // Función opcional a ejecutar cuando se elimina el ítem
}

const DeleteIcon: React.FC<DeleteIconProps> = ({ onDelete }) => {
  return <TodoIcon type="delete" onClick={onDelete} />;
};

export { DeleteIcon };
