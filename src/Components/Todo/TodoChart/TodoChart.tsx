import React, { useMemo, useRef, useEffect } from "react";
import { Chart } from "primereact/chart";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  time: { hours: number; minutes: number };
  timeReset: { hours: number; minutes: number };
  date: Date;
  pausa: boolean;
}

interface TodoChartProps {
  todos: Todo[];
}

const TodoChart: React.FC<TodoChartProps> = ({ todos }) => {
  const chartRef = useRef<Chart | null>(null); // Ref para la instancia del gráfico

  // Memoizamos los datos del gráfico para evitar cálculos innecesarios
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
        datos[dia]++;
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
  }, [todos]); // Solo recalcula cuando `todos` cambie

  const options = {
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
  };

  // Efecto para actualizar el gráfico solo cuando los datos cambian
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chart; // Obtén la instancia del gráfico
      if (chartInstance) {
        chartInstance.update(); // Actualiza el gráfico solo si los datos han cambiado
      }
    }
  }, [data]); // Dependemos de `data`, que solo cambia cuando `todos` cambia

  return (
    <div className="card">
      <Chart ref={chartRef} type="line" data={data} options={options} />
    </div>
  );
};

export default TodoChart;
