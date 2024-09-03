import React from "react";

interface PauseIconProps {
  width?: string; // Ancho del ícono
  height?: string; // Altura del ícono
  color?: string; // Color del ícono
  className?: string;
}

const PauseIcon: React.FC<PauseIconProps> = ({
  width = "40px",
  height = "40px",
  color = "black",
  className
}) => {
  return (
    <svg
    className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      width={width}
      height={height}
      fill={color}
    >
      <path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z" />
    </svg>
  );
};

export default PauseIcon;
