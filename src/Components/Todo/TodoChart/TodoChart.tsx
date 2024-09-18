import React, { useMemo, useRef, useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { TodosLoading } from "../TodoLoading/TodoLoading";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  time: { hours: number; minutes: number };
  timeReset: { hours: number; minutes: number };
  date: Date;
  pausa: boolean;
}

const TodoChart: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);
  const prevTodosRef = useRef<Todo[]>([]);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true); // Estado para el loader

  const getTodosFromLocalStorage = (): Todo[] => {
    const todosString = localStorage.getItem("TODOS_V1");

    if (todosString) {
      try {
        const todos: Todo[] = JSON.parse(todosString);
        return todos;
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        return [];
      }
    }
    return [];
  };

  const areTodosEqual = (todos1: Todo[], todos2: Todo[]): boolean => {
    if (todos1.length !== todos2.length) return false;
    return todos1.every((todo, index) => {
      const todo2 = todos2[index];
      return (
        todo.text === todo2.text &&
        todo.completed === todo2.completed &&
        todo.timeReset.hours === todo2.timeReset.hours &&
        todo.timeReset.minutes === todo2.timeReset.minutes &&
        todo.date.toString() === todo2.date.toString() &&
        todo.pausa === todo2.pausa
      );
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTodos = getTodosFromLocalStorage();
      if (!areTodosEqual(prevTodosRef.current, newTodos)) {
        setLoading(true); // Activa el loader cuando los todos cambian
        setTodos(newTodos);
        prevTodosRef.current = newTodos;

        // Desactiva el loader después de 0.5 segundos
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    }, 1000); // Verifica cada segundo, puedes ajustar este tiempo según lo necesites

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const data = useMemo(() => {
    const obtenerDatosSemana = (todos: Todo[]) => {
      const diasDeLaSemana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ];
      const datos = new Array(7).fill(0);

      todos.forEach((todo) => {
        const dia = new Date(todo.date).getDay(); // 0=Domingo, 1=Lunes, ..., 6=Sábado
        const indiceDia = dia === 0 ? 6 : dia - 1; // Ajusta el índice para que Lunes sea 0 y Domingo sea 6
        datos[indiceDia]++;
      });

      return { diasDeLaSemana, datos };
    };

    const { diasDeLaSemana, datos } = obtenerDatosSemana(todos);

    return {
      labels: diasDeLaSemana,
      datasets: [
        {
          label: "Número de Tareas completadas",
          data: datos,
          fill: false,
          borderColor: "#42A5F5",
          tension: 0.4,
        },
      ],
    };
  }, [todos]);

  const options = useMemo(
    () => ({
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: "#333",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#666",
          },
          grid: {
            color: "#eee",
          },
        },
        y: {
          ticks: {
            color: "#666",
          },
          grid: {
            color: "#eee",
          },
        },
      },
    }),
    []
  );

  return (
    <div >
      {loading ? (
        <TodosLoading/> // Loader simple
      ) : (
        <Chart ref={chartRef} type="line" data={data} options={options} />
      )}
    </div>
  );
};

export default TodoChart;
