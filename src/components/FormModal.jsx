import React, { useEffect } from "react";
import { motion } from "framer-motion";
import TextBox from "./TextBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, saveUser, updateUser } from "../store/user-slice";
import { saveProduct, updateProduct } from "../store/product-slice";
import { useState } from "react";

const FormModal = ({ addTitle, updateTitle, fields, actions, form, edit }) => {
  const dispatch = useDispatch();
  const { errors, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(actions.setForm({ name, value }));
  };

  const closeModal = () => {
    dispatch(actions.setShowModal(false));
    dispatch(actions.setEdit(false));
    dispatch(actions.resetForm());
    dispatch(actions?.resetErrors());
  };

  const formData = new FormData();

  const getFile = async (e) => {
    e.preventDefault();
    await formData.append("image", e.target.files[0]);
  };

  const save = async () => {
    try {
      if (addTitle.includes("User")) await dispatch(saveUser(form));
      else if (addTitle.includes("Product")) {
        Object.keys(form).map((item) => {
          if (item !== "image") formData.append(item, form[item]);
        });
        formData.append("enctype", "multipart/form-data");
        dispatch(saveProduct(formData));

        dispatch(actions.resetErrors());
      }
    } catch (e) {
      console.log(e)
    }
  };

  const update = () => {
    if (addTitle.includes("User")) dispatch(updateUser(form));
    else if (addTitle.includes("Product")) {
      Object.keys(form).map((item) => {
        if (item !== "image") formData.append(item, form[item]);
      });

      formData.append("enctype", "multipart/form-data");
      formData.append("_method", "PUT");
      dispatch(updateProduct(formData));

      dispatch(actions.resetForm());
    }
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    if (addTitle.includes("User")) dispatch(actions.updateRole(value));
    else if (addTitle.includes("Product")) dispatch(actions.setType(value));
  };

  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ y: "-1000px" }}
          animate={{ y: "-50px" }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-xl py-6 px-12 flex flex-col justify-center w-4/12"
        >
          <p className="font-bold text-2xl text-gray-900 mb-3">
            {edit ? updateTitle : addTitle}
          </p>

          <div>
            {fields.map((item, index) => (
              <div key={index} className="mb-2">
                {!item.file && !item.dropdown && (
                  <TextBox
                    type={item?.type}
                    placeholder={item.ph}
                    icon={item.icon}
                    field={item.field}
                    value={form[item.field]}
                    handleChange={handleChange}
                    errorMsg={errors[item.field] ? errors[item.field] : ""}
                  />
                )}
                {item.file && (
                  <input
                    type="file"
                    placeholder="Upload Image"
                    name="image"
                    onChange={(e) => getFile(e)}
                    accept="image/png, image/gif, image/jpeg"
                    className="text-gray-500 border py-3 pr-3 pl-10 rounded-md shadow-md w-full focus:outline-none"
                  />
                )}

                {item.dropdown && (
                  <select
                    name="role"
                    value={form.field}
                    onChange={(e) => handleSelect(e)}
                    className="text-gray-500 border py-3 pr-3 pl-10 rounded-md shadow-md w-full focus:outline-none"
                  >
                    <option value="Select Status">Select {item.ph}</option>
                    {item.dropdown.map((data, id) => (
                      <option key={id} value={data}>
                        {data}
                      </option>
                    ))}
                  </select>
                )}

                {item.dropdown === "dropdown" && (
                  <select
                    name="cars"
                    id="cars"
                    className="text-gray-500 border py-3 pr-3 pl-10 rounded-md shadow-md w-full focus:outline-none"
                  >
                    <option defaultValue="Select Status">Select Status</option>
                    <option value="saab">Paid</option>
                    <option value="mercedes">Pending</option>
                    <option value="audi">Completed</option>
                  </select>
                )}
              </div>
            ))}

            <div className="text-right mt-3">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              >
                Close
              </button>
              {!edit ? (
                <button
                  className="bg-indigo-500 text-white py-2 px-4 rounded"
                  onClick={save}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={update}
                  className="bg-indigo-500 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FormModal;
