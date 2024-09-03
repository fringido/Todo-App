import React from "react";
import "./TodoForm.css";
import { TimeInput } from "../../Inputs/InputTime/TimeInput";

interface TodoFormProps {
  addTodo: (text: string, time: { hours: number; minutes: number }) => void; // Actualizado para aceptar tiempo
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; // Función para actualizar el estado del modal
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, setOpenModal }) => {
  const [newTodoValue, setNewTodoValue] = React.useState("");
  const [time, setTime] = React.useState({ hours: 0, minutes: 0 });
  const [submitA, setSubmitA] = React.useState(false);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodoValue(event.target.value);
    if (event.target.value.length > 0) {
      setSubmitA(true);
    } else {
      setSubmitA(false);
    }
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(newTodoValue, time); // Enviar el texto del TODO y el tiempo
    setOpenModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Escribe tu nuevo TODO</label>
      <textarea
        value={newTodoValue}
        onChange={onChange}
        placeholder="Cortar la cebolla para el almuerzo"
      />
      <TimeInput value={time} onChange={setTime} />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>

        {submitA ? (
          <button
            type="submit"
            className="TodoForm-button TodoForm-button--add"
          >
            Añadir
          </button>
        ) : null}
      </div>
    </form>
  );
};

export { TodoForm };
