import React from "react";

const NotifBar = ({ message, icon }) => {
  return (
    <div className="bg-green-500 flex justify-between items-center text-white p-2 rounded-md">
      <p className="text-sm">{message}</p>
      {icon}
    </div>
  );
};

export default NotifBar;
