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

function App() {
  const [vista, setVista] = React.useState(true);
  const { state, stateUpdaters } = useTodos();

  const {
    error,
    loading,
    searchedTodos,
    completedTodos,
    totalTodos,
    openModal,
    searchValue,
    
    
  } = state;

  const {
  
    addTodo,
    completeTodo,
    setOpenModal,
    deleteTodo,
    setSearchValue,
    pauseTodo,
  } = stateUpdaters;

  return (
    <React.Fragment>
      <Header
        totalTodos={totalTodos}
        completedTodos={completedTodos}
        loading={loading}
      />
      <button onClick={() => setVista(!vista)}>Cambiar vista</button>
      {vista ? (
        <div>
          <Search
            searchValue={searchValue}
            loading={false}
            setSearchValue={setSearchValue}
          />
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
              <p>No hay resultados para {searchText}</p>
            )}
          >
            {(todo) => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                time={todo.time}
                completed={todo.completed}
                onComplete={() => completeTodo(todo.text)}
                onDelete={() => deleteTodo(todo.id)}
                onPause={() => {
                  pauseTodo(todo.id);
                }}
                pause={todo.pase}
              />
            )}
          </TodoList>
          {openModal && (
            <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
          )}
          <CreateTodoButton setOpenModal={setOpenModal} />
        </div>
      ) : (
        <div>hola</div>
      )}
    </React.Fragment>
  );
}

export default App;
