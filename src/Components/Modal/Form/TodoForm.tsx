import React, { useEffect } from "react";
import "./TodoForm.css";
import { TimeInput } from "../../Inputs/InputTime/TimeInput";

interface TodoFormProps {
  addTodo: (text: string, time: { hours: number; minutes: number }) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  todoToEdit?: {
    id: number;
    text: string;
    time: { hours: number; minutes: number };
  };
  editTodo?: (
    id: number,
    text: string,
    time: { hours: number; minutes: number }
  ) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  addTodo,
  setOpenModal,
  todoToEdit,
  editTodo,
}) => {
  const [newTodoValue, setNewTodoValue] = React.useState(
    todoToEdit?.text || ""
  );
  const [time, setTime] = React.useState(
    todoToEdit?.time || { hours: 0, minutes: 0 }
  );
  const [submitA, setSubmitA] = React.useState(false);

  useEffect(() => {
    if (todoToEdit && todoToEdit.text.length > 0) {
      setSubmitA(true);
    }
  }, [todoToEdit]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodoValue(event.target.value);
    setSubmitA(event.target.value.length > 0);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoToEdit && editTodo) {
      editTodo(todoToEdit.id, newTodoValue, time);
        window.location.reload();

    } else {
      addTodo(newTodoValue, time);
    }
    setOpenModal(false);
  };

  return (
    <form className="ModalBackground" onSubmit={onSubmit}>
      <div className="card">
        <div className="card2">
          <label>Escribe tu {todoToEdit ? "nuevo " : ""}task</label>
          <textarea
            value={newTodoValue}
            onChange={onChange}
            placeholder="Cortar la cebolla para el almuerzo"
          />
          <TimeInput value={time} onChange={setTime} />
          <div className="TodoForm-buttonContainer">
            <button type="button" className="button-tap" onClick={onCancel}>
              Cancelar
            </button>
            {submitA && (
              <button type="submit" className="button-tap">
                {todoToEdit ? "Editar" : "Añadir"}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export { TodoForm };
