import React, { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    time: { hours: number; minutes: number };
    timeReset: { hours: number; minutes: number };
    date: Date;
    pausa: boolean;
}

interface UseTodosState {
    loading: boolean;
    error: boolean;
    totalTodos: number;
    completedTodos: number;
    searchValue: string;
    searchedTodos: Todo[];
    openModal: boolean;
    filter: 'all' | 'completed' | 'short' | 'medium' | 'long'; // Filtros actualizados
}

interface UseTodosStateUpdaters {
    setSearchValue: (value: string) => void;
    addTodo: (text: string, time: { hours: number; minutes: number }) => void;
    completeTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    sincronizeTodos: () => void;
    pauseTodo: (id: number) => void;
    setFilter: (filter: 'all' | 'completed' | 'short' | 'medium' | 'long') => void; // Filtros actualizados
    editTodo: (id: number, newText: string, newTime: { hours: number; minutes: number }) => void;
    actualizarTodo: (id: number, time: { hours: number; minutes: number }) => void;
    resetTodoTime: (id: number) => void;
}

function useTodos() {
    const {
        item: todos,
        saveItem: saveTodos,
        sincronizeItem: sincronizeTodos,
        loading,
        error,
    } = useLocalStorage<Todo[]>('TODOS_V1', []);

    const [searchValue, setSearchValue] = React.useState<string>('');
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [filter, setFilter] = React.useState<'all' | 'completed' | 'short' | 'medium' | 'long'>('all');

    const completedTodos = todos.filter((todo) => !!todo.completed).length;
    const totalTodos = todos.length;

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Actualizando localStorage cada minuto');
            const newTodos = todos.map(todo => {
                if (!todo.pausa) {
                    // Aumenta el tiempo si no está en pausa
                    let { hours, minutes } = todo.time;
                    minutes += 1;
                    if (minutes >= 60) {
                        minutes = 0;
                        hours += 1;
                    }
                    return { ...todo, time: { hours, minutes } };
                }
                return todo;
            });
            saveTodos(newTodos);
        }, 60000); // 60000 ms = 1 minuto

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, []);

    const applyFilters = (todos: Todo[]): Todo[] => {
        let filteredTodos = todos;

        switch (filter) {
            case 'completed':
                filteredTodos = filteredTodos.filter((todo) => todo.completed);
                break;
            case 'short':
                filteredTodos = filteredTodos.filter(
                    (todo) => todo.time.hours === 0 && todo.time.minutes <= 30
                );
                break;
            case 'medium':
                filteredTodos = filteredTodos.filter(
                    (todo) => (todo.time.hours === 0 && todo.time.minutes > 30 && todo.time.minutes <= 60) ||
                        (todo.time.hours === 1 && todo.time.minutes === 0)
                );
                break;
            case 'long':
                filteredTodos = filteredTodos.filter(
                    (todo) => todo.time.hours > 1 || (todo.time.hours === 1 && todo.time.minutes > 0)
                );
                break;
            default:
                break;
        }

        if (searchValue.length > 0) {
            filteredTodos = filteredTodos.filter((todo) =>
                todo.text.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        return filteredTodos;
    };

    const searchedTodos = applyFilters(todos);

    const addTodo = (text: string, time: { hours: number; minutes: number }) => {
        const newTodos = [...todos];
        newTodos.push({
            id: newTodos.length + 1,
            completed: false,
            text,
            date: new Date(),
            time,
            timeReset: time, // Inicializa el tiempo de restablecimiento
            pausa: false,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
            const newTodos = [...todos];
            newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
            saveTodos(newTodos);
        }
    };

    const actualizarTodo = (id: number, time: { hours: number; minutes: number }) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
            const newTodos = [...todos];
            newTodos[todoIndex].time = time;
            saveTodos(newTodos);
        }
    };

    const resetTodoTime = (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
            const newTodos = [...todos];
            const todo = newTodos[todoIndex];
            newTodos[todoIndex].time = todo.timeReset; // Restablece al tiempo original
            saveTodos(newTodos);
        }
    };

    const deleteTodo = (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    const pauseTodo = (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        const newTodos = [...todos];
        newTodos[todoIndex].pausa = !newTodos[todoIndex].pausa;
        saveTodos(newTodos);
    };

    const editTodo = (id: number, newText: string, newTime: { hours: number; minutes: number }) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
            const newTodos = [...todos];
            newTodos[todoIndex] = {
                ...newTodos[todoIndex],
                text: newText,
                time: newTime,
            };
            saveTodos(newTodos);
        }
    };

    // Actualiza el localStorage cada minuto


    const state: UseTodosState = {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        searchedTodos,
        openModal,
        filter,
    };

    const stateUpdaters: UseTodosStateUpdaters = {
        setSearchValue,
        addTodo,
        completeTodo,
        deleteTodo,
        setOpenModal,
        pauseTodo,
        actualizarTodo,
        sincronizeTodos,
        setFilter,
        editTodo,
        resetTodoTime,
    };

    return { state, stateUpdaters };
}

export { useTodos };
