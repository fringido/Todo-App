import React from "react";
import './CreateTodoButton.css'
interface CreateTodoButtonProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; // Función de actualización de estado
}

const CreateTodoButton: React.FC<CreateTodoButtonProps> = ({
  setOpenModal,
}) => {
  const onClickButton = () => {
    setOpenModal((prevState) => !prevState); // Alterna el estado del modal
  };

  return (
    <button className="add" onClick={onClickButton}>
      Crear 
    </button>
  );
};

export { CreateTodoButton };
