import React from "react";
import { IconProps } from ".";

const LoginIcon: React.FC<IconProps> = ({ className, color, size = 30 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g fill={color || "currentColor"}>
        <path d="M12 3.25a.75.75 0 000 1.5 7.25 7.25 0 110 14.5.75.75 0 000 1.5 8.75 8.75 0 100-17.5z"></path>
        <path d="M10.47 9.53a.75.75 0 011.06-1.06l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H4a.75.75 0 010-1.5h8.19l-1.72-1.72z"></path>
      </g>
    </svg>
  );
};

export default LoginIcon;
