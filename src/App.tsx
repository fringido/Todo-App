import React from "react";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { Search } from "./Components/Search/Search";
import { useTodos } from "./Hook/useTodos";
import { TodoList } from "./Components/Todo/TodoList/TodoList";
import { TodosError } from "./Components/Todo/TodoError/TodoError";
import { TodosLoading } from "./Components/Todo/TodoLoading/TodoLoading";
import { EmptyTodos } from "./Components/Todo/EmptyTodos/EmptyTodos";
import { TodoItem } from "./Components/Todo/TodoItem/TodoItem";
import { CreateTodoButton } from "./Components/Buttons/CreateTodoButton/CreateTodoButton";
import { TodoForm } from "./Components/Modal/Form/TodoForm";
import { TabButton } from "./Components/Buttons/TabButton/TabButton";
import TodoChart from "./Components/Todo/TodoChart/TodoChart";

// Definición del tipo Todo
interface Todo {
  id: number;
  text: string;
  time: { hours: number; minutes: number };
  completed: boolean;
  pausa: boolean;
}

function App() {
  // Estado para controlar la vista actual (lista de tareas o gráfico)
  const [vista, setVista] = React.useState(true);

  // Estado para la tarea que se va a editar
  const [todoToEdit, setTodoToEdit] = React.useState<Todo | undefined>(
    undefined
  );

  // Hook personalizado para gestionar los todos
  const { state, stateUpdaters } = useTodos();

  const {
    error,
    loading,
    searchedTodos,
    completedTodos,
    totalTodos,
    openModal,
    searchValue,
    filter,
  } = state;

  const {
    addTodo,
    completeTodo,
    setOpenModal,
    deleteTodo,
    setSearchValue,
    resetTodoTime,
    pauseTodo,
    setFilter,
    editTodo,
  } = stateUpdaters;

  // Maneja la edición de una tarea
  const handleEditTodo = (todo: Todo) => {
    setTodoToEdit(todo);
    setOpenModal(true);
  };

  // Actualiza el tiempo de una tarea existente
  const handleActualizar = (
    id: number,
    time: { hours: number; minutes: number }
  ) => {
    const todo = searchedTodos.find((todo) => todo.id === id);
    if (todo) {
      editTodo(id, todo.text, time);
    }
  };

  // Guarda una nueva tarea o actualiza una tarea existente
  const handleSaveTodo = (
    text: string,
    time: { hours: number; minutes: number }
  ) => {
    if (todoToEdit) {
      editTodo(todoToEdit.id, text, time);
    } else {
      addTodo(text, time);
    }
    setTodoToEdit(undefined); // Resetea la tarea a editar
    setOpenModal(false);
  };

  // Resetea el tiempo de una tarea y recarga la página
  const handleReset = (id: number) => {
    resetTodoTime(id);
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Header
        totalTodos={totalTodos}
        completedTodos={completedTodos}
        loading={loading}
      />
      <button onClick={() => setVista(!vista)}>
        <TabButton vista={vista} />
      </button>
      {vista ? (
        <CreateTodoButton
          setOpenModal={() => {
            setTodoToEdit(undefined); // Resetea la tarea a editar
            setOpenModal(true);
          }}
        />
      ) : null}

      {vista ? (
        <div>
          <Search
            searchValue={searchValue}
            loading={false}
            setSearchValue={setSearchValue}
          />
          <div className="filters">
            <div className="tittle-filter">Filtros</div>
            <button
              className={`button-compleat ${
                filter === "completed" ? "active" : ""
              }`}
              onClick={() => setFilter("completed")}
            >
              Tareas Completadas
            </button>
            <button
              className={`button-short ${filter === "short" ? "active" : ""}`}
              onClick={() => setFilter("short")}
            >
              Corto (30 min o menos)
            </button>
            <button
              className={`button-medium ${filter === "medium" ? "active" : ""}`}
              onClick={() => setFilter("medium")}
            >
              Medio (30 min a 1h)
            </button>
            <button
              className={`button-long ${filter === "long" ? "active" : ""}`}
              onClick={() => setFilter("long")}
            >
              Largo (más de 1h)
            </button>
            <button
              className={`button-compleat ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Quitar Filtros
            </button>
          </div>
          <TodoList
            error={error}
            loading={loading}
            totalTodos={totalTodos}
            searchedTodos={searchedTodos}
            searchText={searchValue}
            onError={() => <TodosError />}
            onLoading={() => <TodosLoading />}
            onEmptyTodos={() => <EmptyTodos />}
            onEmptySearchResults={(searchText) => (
              <p className="no_result">
                No hay resultados para consulta {searchText}
              </p>
            )}
          >
            {(todo) => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                time={todo.time}
                completed={todo.completed}
                onComplete={() => completeTodo(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
                onPause={() => pauseTodo(todo.id)}
                onEdit={() => handleEditTodo(todo)}
                pause={todo.pausa}
                onActualizar={(time) => handleActualizar(todo.id, time)}
                onResetTime={() => handleReset(todo.id)}
              />
            )}
          </TodoList>

          {openModal && (
            <TodoForm
              addTodo={handleSaveTodo}
              setOpenModal={stateUpdaters.setOpenModal}
              todoToEdit={todoToEdit}
              editTodo={stateUpdaters.editTodo}
            />
          )}
        </div>
      ) : (
        <TodoChart todos={searchedTodos} />
      )}
    </React.Fragment>
  );
}

export default App;
