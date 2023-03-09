import React from "react";

const Button = ({ btnName, action }) => {
  return (
    <button className="bg-green-600 py-2 px-4 rounded text-white md:ml-8" onClick={action}>
      {btnName}
    </button>
  );
};

export default Button;
