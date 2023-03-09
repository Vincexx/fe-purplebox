import React from "react";
import PropTypes from "prop-types";

const TextBox = ({
  type = "text",
  placeholder,
  icon,
  handleChange,
  field,
  value,
  errorMsg,
}) => {
  return (
    <>
      <div className="flex items-center focus-within:text-gray-700 relative">
        <input
          type={type}
          className={`text-gray-600 border py-2 pr-3 pl-10 rounded-md shadow-md w-full focus:outline-none ${
            errorMsg && "border-red-500"
          }`}
          placeholder={placeholder}
          name={field}
          onChange={handleChange}
          value={value}
        />
        <div className={`absolute pl-3 ${errorMsg && "text-red-500"}`}>
          {icon}
        </div>
      </div>
      {errorMsg && <sub className="text-red-500 font-bold">{errorMsg}</sub>}
    </>
  );
};

TextBox.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.object.isRequired,
};

export default TextBox;
