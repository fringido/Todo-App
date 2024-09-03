
import React from "react";

// Define las props del componente (si es necesario)
interface IconProps {
  width?: string; // Ancho del SVG (opcional)
  height?: string; // Alto del SVG (opcional)
  color?: string; // Color del SVG (opcional)
  className?: string;
}

const Check: React.FC<IconProps> = ({
  width = "24",
  height = "24",
  color = "currentColor",
  className,
}) => {
  return (
    <svg
      viewBox="0 0 405.272 405.272"
      xmlSpace="preserve"
      width={width}
      height={height}
      fill={color}
      className={className}
    >
      <path
        d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836
        c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064
        c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z"
      />
    </svg>
  );
};

export { Check };
