
import { Check } from "./check";
import { Delete } from "./delete";
interface TodoIconProps {
  type: "check" | "delete"; // Tipos de íconos disponibles
  color?: string; // Color del ícono (opcional)
  onClick?: () => void; // Función a ejecutar al hacer clic (opcional)
}

// Define el objeto que contiene los diferentes tipos de íconos
const iconTypes = {
  check: (color: string) => (
    <Check className="Icon-svg Icon-svg--check" color={color} />
  ),
  delete: (color: string) => (
    <Delete className="Icon-svg Icon-svg--delete" color={color} />
  ),
};

const TodoIcon: React.FC<TodoIconProps> = ({
  type,
  color = "gray",
  onClick,
}) => {
  return (
    <span
      className={`Icon-container Icon-container--${type}`}
      onClick={onClick}
    >
      {iconTypes[type](color)}
    </span>
  );
};

export { TodoIcon };
