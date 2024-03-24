import React from "react";
import { IconProps } from ".";

const RefreshIcon: React.FC<IconProps> = ({ size = 30, className, color }) => {
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
        strokeWidth="2"
        d="M21 3v5m0 0h-5m5 0l-3-2.708A9 9 0 1020.777 14"
      ></path>
    </svg>
  );
};

export default RefreshIcon;
