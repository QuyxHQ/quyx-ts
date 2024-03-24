import React from "react";
import { IconProps } from ".";

const HelpIcon: React.FC<IconProps> = ({ size = 30, className, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
      className={className}
      viewBox="0 0 25 25"
    >
      <path
        stroke={color || "currentColor"}
        strokeWidth="1.5"
        d="M12.5 13c0-2 1.5-1.5 1.5-3 0-.656-.5-1.5-1.5-1.5s-1.5.5-2 1m2 6.5v-1.5m8-2a8 8 0 11-16 0 8 8 0 0116 0z"
      ></path>
    </svg>
  );
};

export default HelpIcon;
