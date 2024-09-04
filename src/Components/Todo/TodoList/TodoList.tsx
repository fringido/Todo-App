import React from "react";
import "./TodoList.css";

interface TodoListProps {
  error: boolean; // Indica si hay un error
  loading: boolean; // Indica si los datos están cargando
  totalTodos: number; // Número total de tareas
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchedTodos: any[]; // Array de tareas buscadas (puede ser de cualquier tipo)
  searchText: string; // Texto de búsqueda actual
  onError: () => React.ReactNode; // Función que devuelve un componente en caso de error
  onLoading: () => React.ReactNode; // Función que devuelve un componente durante la carga
  onEmptyTodos: () => React.ReactNode; // Función que devuelve un componente cuando no hay tareas
  onEmptySearchResults: (searchText: string) => React.ReactNode; // Función que devuelve un componente cuando no hay resultados de búsqueda
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (todo: any) => React.ReactNode; // Función opcional de renderizado
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: (todo: any) => React.ReactNode; // Propiedad opcional de renderizado para niños
}

const TodoList: React.FC<TodoListProps> = (props) => {
  const renderFunc = props.children || props.render; // Función de renderizado

  return (
    <section className="TodoList-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}

      {!props.loading && !props.totalTodos && props.onEmptyTodos()}

      {!!props.totalTodos &&
        !props.searchedTodos.length &&
        props.onEmptySearchResults(props.searchText)}

      {!props.loading && !props.error && props.searchedTodos.map(renderFunc!)}
      
    </section>
  );
};

export { TodoList };
