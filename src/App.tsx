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

function App() {
  const [vista, setVista] = React.useState(true);
  const [todoToEdit, setTodoToEdit] = React.useState(null); // Tarea que se va a editar
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
    pauseTodo,
    setFilter,
    editTodo, // Añadimos la función para editar tareas
  } = stateUpdaters;

  const handleEditTodo = (todo) => {
    setTodoToEdit(todo); // Establece la tarea que se va a editar
    setOpenModal(true); // Abre el modal en modo edición
  };

const handleActualizar = (id, time) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    editTodo(id, todo.text, time);
  }
};

  const handleSaveTodo = (text, time) => {
    if (todoToEdit) {
      editTodo(todoToEdit.id, text, time); // Llama a editTodo con el nuevo texto y tiempo
    } else {
      addTodo(text, time); // Si no estamos editando, agrega una nueva tarea
    }
    setTodoToEdit(null); // Resetea el estado de edición
    setOpenModal(false); // Cierra el modal
  };

  return (
    <React.Fragment>
      <Header
        totalTodos={totalTodos}
        completedTodos={completedTodos}
        loading={loading}
      />
      <button onClick={() => setVista(!vista)}>
        <TabButton />
      </button>
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
              <p className="no_result">No hay resultados para {searchText}</p>
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
                onPause={() => {
                  pauseTodo(todo.id);
                }}
                onEdit={() => handleEditTodo(todo)} // Agrega el manejador de edición
                pause={todo.pausa}
                onActualizar={(time) => handleActualizar(time, todo.id)}
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
          <CreateTodoButton
            setOpenModal={() => {
              setTodoToEdit(null); // Resetea la tarea a editar
              setOpenModal(true);
            }}
          />
        </div>
      ) : (
        <TodosLoading />
      )}
    </React.Fragment>
  );
}

export default App;
