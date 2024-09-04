import React, { useEffect } from 'react';

interface State<T> {
    sincronizedItem: boolean;  // Indica si el item está sincronizado
    error: boolean;            // Indica si hubo un error
    loading: boolean;          // Indica si los datos están cargando
    item: T;                   // El item almacenado
}

type Action<T> =
    | { type: 'ERROR'; payload: unknown }  // Acción para manejar errores
    | { type: 'SUCCESS'; payload: T }       // Acción para manejar éxito
    | { type: 'SAVE'; payload: T }          // Acción para guardar un item
    | { type: 'SINCRONIZE' };               // Acción para sincronizar

const actionTypes = {
    error: 'ERROR',
    success: 'SUCCESS',
    save: 'SAVE',
    sincronize: 'SINCRONIZE',
} as const;

function useLocalStorage<T>(itemName: string, initialValue: T) {
    const [state, dispatch] = React.useReducer(
        reducer<T>,
        initialState({ initialValue })
    );

    const { sincronizedItem, error, loading, item } = state;

    // ACTION CREATORS
    const onError = (error: unknown) =>
        dispatch({
            type: actionTypes.error,
            payload: error,
        });

    const onSuccess = (item: T) =>
        dispatch({
            type: actionTypes.success,
            payload: item,
        });

    const onSave = (item: T) =>
        dispatch({
            type: actionTypes.save,
            payload: item,
        });

    const onSincronize = () =>
        dispatch({
            type: actionTypes.sincronize,
        });

    useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem: T;

                if (!localStorageItem) {
                    localStorage.setItem(itemName, JSON.stringify(initialValue));
                    parsedItem = initialValue;
                } else {
                    parsedItem = JSON.parse(localStorageItem);
                }

                onSuccess(parsedItem);
            } catch (error) {
                onError(error);
            }
        }, 3000);
    }, [sincronizedItem, initialValue, itemName]);

    const saveItem = (newItem: T) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifiedItem);
            onSave(newItem);
        } catch (error) {
            onError(error);
        }
    };

    const sincronizeItem = () => {
        onSincronize();
    };

    return {
        item,
        saveItem,
        loading,
        error,
        sincronizeItem,
    };
}

const initialState = <T>({ initialValue }: { initialValue: T }): State<T> => ({
    sincronizedItem: true,
    error: false,
    loading: true,
    item: initialValue,
});

const reducerObject = <T>(state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
        case actionTypes.error:
            return {
                ...state,
                error: true,
            };
        case actionTypes.success:
            return {
                ...state,
                error: false,
                loading: false,
                sincronizedItem: true,
                item: action.payload,
            };
        case actionTypes.save:
            return {
                ...state,
                item: action.payload,
            };
        case actionTypes.sincronize:
            return {
                ...state,
                sincronizedItem: false,
                loading: true,
            };
        default:
            return state;
    }
};

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
    return reducerObject(state, action);
};

export { useLocalStorage };
