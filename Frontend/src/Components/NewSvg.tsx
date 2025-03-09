import React from "react";

type NewSvgProps = {
  direction: "up" | "down" | "left" | "right";
  isActive?: boolean; // Prop to indicate if the arrow is active
  className?: string;
};

const NewSvg: React.FC<NewSvgProps> = ({
  direction,
  isActive
}) => {
  // Function to determine the SVG path and its fill color based on isActive
  const getSvgPath = () => (
    <path
      d="M38.5362 33.25V59.5H24.301c-7.829 0-14.2188.0329-14.2023.0657.0329.0984 49.8519 52.4183 49.9013 52.4183.0493 0 49.868-52.3199 49.901-52.4183.017-.0328-6.373-.0657-14.202-.0657H81.4638V7.00004H38.5362V33.25Z"
      fill={isActive ? "blue" : "gray"} // Change color based on isActive
    />
  );

  return (
    <svg
      className={`is-${direction} w-full h-full p-1`} // Added padding inside SVG
      viewBox="-10 -10 120 120" // Adjusted ViewBox for more space
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {getSvgPath()}
    </svg>
  );
};

export default NewSvg;
