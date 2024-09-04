import React, { useEffect, useState } from "react";
import { CompleteIcon } from "../../Icons/CompleteIcon";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import "./TodoItem.css";
import PlayIcon from "../../Icons/PlayIcon";
import PauseIcon from "../../Icons/PauseIcon";
import EditIcon from "../../Icons/EdithIcon";

// Define la interfaz para las props del componente TodoItem
interface TodoItemProps {
  text: string; // El texto del ítem
  completed: boolean; // Estado de completado del ítem
  time: { hours: number; minutes: number }; // Tiempo para la cuenta regresiva
  pause: boolean; // Estado de pausa
  onComplete: () => void; // Función a ejecutar cuando se completa el ítem
  onDelete: () => void; // Función a ejecutar cuando se elimina el ítem
  onPause: () => void; // Función a ejecutar cuando se pausa el ítem
  onEdit: () => void;
  onActualizar: (time: { hours: number; minutes: number }) => void; // Función a ejecutar cuando se edita el ítem
  onResetTime : () => void;
}

// Define el componente TodoItem con la interfaz TodoItemProps
const TodoItem: React.FC<TodoItemProps> = (props) => {
  // Estado para manejar el tiempo restante
  const [remainingTime, setRemainingTime] = useState<{
    hours: number;
    minutes: number;
  }>(props.time);

  const [pause, setPause] = useState(props.pause);

  const onPause = () => {
    if (remainingTime.hours === 0 && remainingTime.minutes === 0) {
      return;
    }
    setPause(!pause);
    props.onPause();
  };

 

  useEffect(() => {
    if (!props.pause) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = { ...prevTime };

          if (newTime.minutes === 0) {
            if (newTime.hours === 0) {
              props.onPause();
              clearInterval(timer); // Detiene el temporizador cuando llega a 00:00
            } else {
              newTime.hours -= 1;
              newTime.minutes = 59;
            }
          } else {
            newTime.minutes -= 1;
          }
          
          return newTime;
        });
      }, 60000); // Intervalo de 1 minuto

      return () => clearInterval(timer);
    }

    // Limpia el temporizador cuando el componente se desmonta
  }, [props.pause]);

  return (
    <div className="item-container">
      <li className="TodoItem">
        {remainingTime.hours === 0 && remainingTime.minutes === 0 ? (
          <CompleteIcon
            completed={props.completed}
            onComplete={props.onComplete}
          />
        ) : (
          <button className="TodoItem-button" onClick={props.onEdit}>
            <EditIcon color="#808080" />
          </button>
        )}

        <p
          className={`TodoItem-p ${
            remainingTime.hours === 0 &&
            remainingTime.minutes === 0 &&
            "TodoItem-p--complete"
          }`}
        >
          {props.text}
        </p>
        <DeleteIcon onDelete={props.onDelete} />
      </li>
      <span className="TodoItem-time">
        {remainingTime.hours}:
        {remainingTime.minutes < 10
          ? `0${remainingTime.minutes}`
          : remainingTime.minutes}
      </span>
      <button className="TodoItem-button" onClick={onPause}>
        {!pause ||
        (remainingTime.hours === 0 && remainingTime.minutes === 0) ? (
          <PlayIcon className="icon-pause" color="#fff" />
        ) : (
          <PauseIcon className="icon-play" color="#fff" />
        )}
      </button>
      <button onClick={props.onResetTime}>reset</button>
    </div>
  );
};

export { TodoItem };
