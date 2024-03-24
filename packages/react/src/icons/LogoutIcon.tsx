import React from "react";
import { IconProps } from ".";

const LogoutIcon: React.FC<IconProps> = ({ className, color, size = 30 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
      className={className}
      viewBox="0 -0.5 25 25"
    >
      <path
        fill={color || "currentColor"}
        d="M11.75 9.874a.75.75 0 001.5 0h-1.5zM13.25 4a.75.75 0 00-1.5 0h1.5zM9.81 6.662a.75.75 0 00-.62-1.366l.62 1.366zM5.5 12.16l-.75-.004v.013l.75-.009zm7 6.84l.009-.75h-.018l.009.75zm7-6.84l.75.009v-.013l-.75.004zm-3.69-6.864a.75.75 0 10-.62 1.366l.62-1.366zm-2.56 4.578V4h-1.5v5.874h1.5zM9.19 5.296a7.581 7.581 0 00-4.44 6.86l1.5.008a6.081 6.081 0 013.56-5.502l-.62-1.366zM4.75 12.17a7.671 7.671 0 007.759 7.581l-.018-1.5a6.17 6.17 0 01-6.241-6.099l-1.5.018zm7.741 7.581a7.67 7.67 0 007.759-7.581l-1.5-.018a6.171 6.171 0 01-6.241 6.099l-.018 1.5zm7.759-7.594a7.581 7.581 0 00-4.44-6.86l-.62 1.366a6.081 6.081 0 013.56 5.502l1.5-.008z"
      ></path>
    </svg>
  );
};

export default LogoutIcon;
