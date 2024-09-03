import React from 'react';
import { useLocalStorage } from './useLocalStorage';

interface Todo {
    id: number;
    text: string; // Texto de la tarea
    completed: boolean; // Estado de completitud de la tarea
    time: { hours: number; minutes: number }; // Tiempo restante de la tarea
    date: Date; // Fecha de creación de la tarea
    pausa: boolean;
}

interface UseTodosState {
    loading: boolean; // Indica si los datos están cargando
    error: boolean; // Indica si hubo un error
    totalTodos: number; // Número total de tareas
    completedTodos: number; // Número de tareas completadas
    searchValue: string; // Valor de búsqueda actual
    searchedTodos: Todo[]; // Lista de tareas buscadas
    openModal: boolean; // Estado del modal (abierto/cerrado)
}

interface UseTodosStateUpdaters {
    setSearchValue: (value: string) => void; // Función para actualizar el valor de búsqueda
    addTodo: (text: string, time: { hours: number; minutes: number }) => void; // Función para añadir una nueva tarea
    completeTodo: (text: string) => void; // Función para marcar una tarea como completada
    deleteTodo: (id: number) => void; // Función para eliminar una tarea
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; // Función para actualizar el estado del modal
    sincronizeTodos: () => void; // Función para sincronizar tareas
    pauseTodo : (id: number) => void;
}

function useTodos() {
    const {
        item: todos,
        saveItem: saveTodos,
        sincronizeItem: sincronizeTodos,
        loading,
        error,
    } = useLocalStorage<Todo[]>('TODOS_V1', []);

    const [searchValue, setSearchValue] = React.useState<string>(''); // Estado de valor de búsqueda
    const [openModal, setOpenModal] = React.useState<boolean>(false); // Estado del modal

    const completedTodos = todos.filter((todo) => !!todo.completed).length; // Número de tareas completadas
    const totalTodos = todos.length; // Número total de tareas

    let searchedTodos: Todo[] = []; // Lista de tareas buscadas

    if (searchValue.length === 0) {
        searchedTodos = todos;
    } else {
        searchedTodos = todos.filter((todo) => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        });
    }

    const addTodo = (text: string, time: { hours: number; minutes: number }) => {
        // Función para añadir una nueva tarea
        const newTodos = [...todos];
        newTodos.push({
            id: newTodos.length + 1,
            completed: false,
            text,
            date: new Date(),
            time,
            pausa: false,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (text: string) => {
        // Función para marcar una tarea como completada
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
    };

    const deleteTodo = (id: number) => {
        // Función para eliminar una tarea
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    const pauseTodo = (id: number) => {
        // Función para pausar una tarea
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        const newTodos = [...todos];
        newTodos[todoIndex].pausa = !newTodos[todoIndex].pausa;
        saveTodos(newTodos);
    };

    


    const state: UseTodosState = {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        searchedTodos,
        openModal,
    };

    const stateUpdaters: UseTodosStateUpdaters = {
        setSearchValue,
        addTodo,
        completeTodo,
        deleteTodo,
        setOpenModal,
        pauseTodo,
        sincronizeTodos,
    };

    return { state, stateUpdaters };
}

export { useTodos };
