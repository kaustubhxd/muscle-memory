import React from "react";

function ThreeDots({width, height, className}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(90)"
      viewBox="0 0 256 256"
      width={width}
      height={height}
    >
      <path d="M128 24a104 104 0 10104 104A104.118 104.118 0 00128 24zm0 192a88 88 0 1188-88 88.1 88.1 0 01-88 88zm12-88a12 12 0 11-12-12 12.014 12.014 0 0112 12zm48 0a12 12 0 11-12-12 12.014 12.014 0 0112 12zm-96 0a12 12 0 11-12-12 12.014 12.014 0 0112 12z"></path>
    </svg>
  );
}

export default ThreeDots;
