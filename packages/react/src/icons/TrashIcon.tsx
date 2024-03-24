import React from "react";
import { IconProps } from ".";

const TrashIcon: React.FC<IconProps> = ({ className, color, size = 30 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
    >
      <path
        stroke={color || "currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18 6v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6M4 6h16m-5 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v1"
      ></path>
    </svg>
  );
};

export default TrashIcon;
