import React, { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage'; // Hook personalizado para manejo de Local Storage
import { generarTareasAleatorias } from './useGenerateDate'; // Función para generar tareas aleatorias

// Definición del tipo Todo
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    time: { hours: number; minutes: number };
    timeReset: { hours: number; minutes: number }; // Tiempo original para restablecer
    date: Date;
    pausa: boolean;
}

// Estado del hook useTodos
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

// Actualizadores del estado del hook useTodos
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
    // Hook personalizado para manejar el almacenamiento en local
    const {
        item: todos,
        saveItem: saveTodos,
        sincronizeItem: sincronizeTodos,
        loading,
        error,
    } = useLocalStorage<Todo[]>('TODOS_V1', []);

    // Estados locales del hook
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [filter, setFilter] = React.useState<'all' | 'completed' | 'short' | 'medium' | 'long'>('all');

    // Calcular el número de tareas completadas y el total de tareas
    const completedTodos = todos.filter((todo) => !!todo.completed).length;
    const totalTodos = todos.length;

    // Efecto para generar tareas aleatorias si no hay tareas en el almacenamiento
    useEffect(() => {
        if (todos.length === 0) {
            const tareasAleatorias = generarTareasAleatorias();
            saveTodos(tareasAleatorias);
        }
    }, [todos, saveTodos]); // Ejecuta solo cuando cambia 'todos'

    // Aplica filtros y búsqueda a la lista de tareas
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
                    (todo) =>
                        (todo.time.hours === 0 && todo.time.minutes > 30 && todo.time.minutes <= 60) ||
                        (todo.time.hours === 1 && todo.time.minutes === 0)
                );
                break;
            case 'long':
                filteredTodos = filteredTodos.filter(
                    (todo) => todo.time.hours > 1 || (todo.time.hours === 1 && todo.time.minutes > 0)
                );
                break;
            case 'all': // Muestra todas las tareas, no solo las completadas
                filteredTodos = filteredTodos.filter((todo) => !todo.completed);
                break;
            default:
                break;
        }

        // Filtra por texto de búsqueda
        if (searchValue.length > 0) {
            filteredTodos = filteredTodos.filter((todo) =>
                todo.text.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Invertir el orden del array
        return filteredTodos.reverse();
    };

    // Lista de tareas filtradas y buscadas
    const searchedTodos = applyFilters(todos);

    // Función para agregar una nueva tarea
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

    // Función para marcar una tarea como completada o no completada
    const completeTodo = (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
            const newTodos = [...todos];
            newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
            saveTodos(newTodos);
        }
    };

    // Función para actualizar el tiempo de una tarea existente
    const actualizarTodo = (id: number, time: { hours: number; minutes: number }) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
            const newTodos = [...todos];
            newTodos[todoIndex].time = time;
            saveTodos(newTodos);
        }
    };

    // Función para restablecer el tiempo de una tarea al original
    const resetTodoTime = (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
            const newTodos = [...todos];
            const todo = newTodos[todoIndex];
            newTodos[todoIndex].time = todo.timeReset; // Restablece al tiempo original
            saveTodos(newTodos);
        }
    };

    // Función para eliminar una tarea
    const deleteTodo = (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    // Función para pausar o reanudar una tarea
    const pauseTodo = (id: number) => {
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        const newTodos = [...todos];
        newTodos[todoIndex].pausa = !newTodos[todoIndex].pausa;
        saveTodos(newTodos);
    };

    // Función para editar una tarea existente
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

    // Estado que se expone al componente que usa este hook
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

    // Actualizadores del estado que se exponen al componente
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

    // Retorna el estado y los actualizadores del estado
    return { state, stateUpdaters };
}

export { useTodos };
