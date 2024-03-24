import React from "react";
import { IconProps } from ".";

const WorldIcon: React.FC<IconProps> = ({ size = 30, className, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color || "currentColor"}
      className={className}
      width={size}
      height={size}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <g stroke={color || "currentColor"}>
        <path d="M19.5 6l-1.467 1.1a2 2 0 01-1.2.4h-3.358c-.598 0-1.144.338-1.411.872v0c-.33.66-.159 1.46.412 1.927l2 1.636a6 6 0 012.164 5.306l-.02.18a8.002 8.002 0 01-.523 2.087L15.5 21M2.5 10.5l3.238-.54a2 2 0 012.302 2.302l-.135.807a3.337 3.337 0 001.8 3.533v0a2.503 2.503 0 011.308 2.846L10.5 21.5"></path>
        <circle cx="12" cy="12" r="9.5"></circle>
      </g>
    </svg>
  );
};

export default WorldIcon;
