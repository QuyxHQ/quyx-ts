import React from "react";
import { IconProps } from ".";

const Logo: React.FC<Omit<IconProps, "color">> = ({ size = 30, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      fill="none"
      viewBox="0 0 28 28"
    >
      <path
        fill="#FFA927"
        d="M10.07 14.788c7.135-4.735 10.793 8.736 14.87 11.07-7.615 5.002-10.793-7.335-14.87-11.07z"
      ></path>
      <path
        fill="url(#paint0_linear_896_1596)"
        fillRule="evenodd"
        d="M27.035 13.518c0 3.462-1.302 6.62-3.442 9.013l-.55-.783a152.177 152.177 0 00-2.728-3.804 8.11 8.11 0 10-8.463 3.513l-2.788 4.828C3.787 24.444 0 19.423 0 13.518 0 6.052 6.052 0 13.518 0c7.465 0 13.517 6.052 13.517 13.518zM10.127 26.607c1.084.28 2.22.428 3.39.428 1.292 0 2.54-.18 3.723-.518-1.376-1.378-2.568-3.094-3.704-4.889h-.018c-.17 0-.34-.005-.508-.015l-2.883 4.994z"
        clipRule="evenodd"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_896_1596"
          x1="13.518"
          x2="13.518"
          y1="0"
          y2="27.035"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9327FF"></stop>
          <stop offset="1" stopColor="#FFA927"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
