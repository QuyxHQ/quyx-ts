import React from "react";
import { IconProps } from ".";

const AlertIcon: React.FC<IconProps> = ({ className, color, size = 30 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
    >
      <g stroke={color || "currentColor"} strokeLinecap="round" strokeWidth="1.8">
        <path d="M12 10v3M12 16v-.011"></path>
        <path
          strokeLinejoin="round"
          d="M10.252 5.147L3.65 17.029C2.91 18.362 3.874 20 5.399 20h13.202c1.525 0 2.489-1.638 1.748-2.971l-6.6-11.882c-.763-1.372-2.735-1.372-3.497 0z"
        ></path>
      </g>
    </svg>
  );
};

export default AlertIcon;
