import React from "react";
import { IconProps } from ".";

const CheckIcon: React.FC<IconProps> = ({ size = 23, className, color }) => {
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
        strokeWidth="3"
        d="M4 12.611L8.923 17.5 20 6.5"
      ></path>
    </svg>
  );
};

export default CheckIcon;
