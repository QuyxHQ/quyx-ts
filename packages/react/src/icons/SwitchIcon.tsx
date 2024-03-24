import React from "react";
import { IconProps } from ".";

const SwitchIcon: React.FC<IconProps> = ({ size = 30, className, color }) => {
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
        strokeWidth="1.44"
        d="M20 17H4m0 0l4-4m-4 4l4 4M4 7h16m0 0l-4-4m4 4l-4 4"
      ></path>
    </svg>
  );
};

export default SwitchIcon;
