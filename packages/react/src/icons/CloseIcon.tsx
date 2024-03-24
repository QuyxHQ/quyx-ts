import React from "react";
import { IconProps } from ".";

const CloseIcon: React.FC<IconProps> = ({ size = 30, className, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
      className={className}
      viewBox="0 0 25 25"
    >
      <path stroke={color || "currentColor"} strokeWidth="1.2" d="M18 7L7 18M7 7l11 11"></path>
    </svg>
  );
};

export default CloseIcon;
