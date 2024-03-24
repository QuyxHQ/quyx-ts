import React from "react";
import { IconProps } from ".";

const ErrorIcon: React.FC<IconProps> = ({ size = 60, className, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color || "currentColor"}
      className={className}
      width={size}
      height={size}
      strokeWidth="2"
      viewBox="0 0 64 64"
    >
      <g>
        <path d="M34.48 54.28L11.06 54.28 11.06 18.61 23.02 5.75 48.67 5.75 48.67 39.42"></path>
        <path d="M23.04 5.75L23.02 18.61 11.06 18.61"></path>
        <path d="M16.21 45.68L28.22 45.68"></path>
        <path d="M16.21 39.15L31.22 39.15"></path>
        <path d="M16.21 33.05L43.22 33.05"></path>
        <path d="M16.21 26.95L43.22 26.95"></path>
        <circle cx="42.92" cy="48.24" r="10.01" strokeLinecap="round"></circle>
        <path strokeLinecap="round" d="M42.95 53.52L42.95 53.73"></path>
        <path strokeLinecap="round" d="M42.95 43.19L42.95 49.69"></path>
      </g>
    </svg>
  );
};

export default ErrorIcon;
