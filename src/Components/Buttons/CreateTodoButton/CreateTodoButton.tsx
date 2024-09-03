import React from "react";

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
    <button className="CreateTodoButton" onClick={onClickButton}>
      +
    </button>
  );
};

export { CreateTodoButton };
