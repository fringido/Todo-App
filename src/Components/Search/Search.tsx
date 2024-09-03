import React from "react";
import './Search.css'
interface TodoSearchProps {
  searchValue: string; // Valor actual del input de búsqueda
  setSearchValue: (value: string) => void; // Función para actualizar el valor de búsqueda
  loading: boolean; // Indica si los datos están cargando
}

const Search: React.FC<TodoSearchProps> = ({
  searchValue,
  setSearchValue,
  loading,
}) => {
  const onSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
    <div className="form-control">
      <input
        value={searchValue}
        onChange={onSearchValueChange}
        disabled={loading}
        className="input input-alt"
        placeholder="Buscar"
        required
        type="text"
      />
      <span className="input-border input-border-alt" />
    </div>
  );
};

export { Search };
