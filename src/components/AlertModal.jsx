import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { click } from "@testing-library/user-event/dist/click";

const Modal = ({ icon, status, message, button, actions }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actions.setSuccess(false));
    dispatch(actions?.setErr(false));
    dispatch(actions?.setFailed(false));
  };

  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ y: "-1000px" }}
          animate={{ y: "-50px" }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-xl py-6 px-24 flex flex-col justify-center items-center"
        >
          {icon}
          <p className="font-bold text-3xl text-gray-900">{status}</p>
          <p className="text-gray-700 mt-3 text-md">{message}</p>
          {button && (
            <button
              className="py-2 px-4 bg-indigo-500 text-white rounded mt-6"
              onClick={() => handleClick()}
            >
              {button}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default Modal;
