import React from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaCheck,
  FaAddressBook,
  FaPhone,
} from "react-icons/fa";
import TextBox from "../components/TextBox";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import axios from "axios";
import { useState } from "react";
import Modal from "../components/AlertModal";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

const Register = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const form = useSelector((state) => state.auth.registerForm);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    address: "",
    role: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const register = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/register`, form)
      .then((res) => {
        setErrors(resetErr);
        setSuccess(true);
        setFailed(false);
        setTimeout(() => {
          setSuccess(false);
          dispatch(authActions.resetRegForm());
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setErrors(resetErr);
        if (err.response.status === 500) setFailed(true);
        if (err.response.status === 400) {
          Object.keys(err.response.data).map((item) => {
            setErrors((prev) => ({
              ...prev,
              [item]: err.response.data[item],
            }));
          });
        }
      });
  };

  const resetErr = {
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(authActions.setRegForm({ name, value }));
  };

  return (
    <>
      {success && (
        <Modal
          icon={<FaCheck className="text-green-500 text-4xl" />}
          status={"Success"}
          message={"Account has been registered"}
        />
      )}
      <div className="h-screen flex items-center justify-center">
        <div className="shadow-md pt-6 px-12 w-full md:w-1/2 lg:w-1/3">
          <h1 className="font-bold text-center uppercase">
            Register an Account
          </h1>
          {failed && (
            <ErrorMessage
              message={"Unknown Error! Please contact your administrator."}
            />
          )}
          <form action="" className="my-3">
            <div className="mb-2">
              <TextBox
                placeholder={"Firstname"}
                icon={<FaUser />}
                field={"first_name"}
                value={form.first_name}
                handleChange={handleChange}
                errorMsg={errors.first_name}
              />
            </div>

            <div className="mb-2">
              <TextBox
                placeholder={"Middlename"}
                icon={<FaUser />}
                field={"middle_name"}
                value={form.middle_name}
                handleChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <TextBox
                placeholder={"Lastname"}
                icon={<FaUser />}
                field={"last_name"}
                value={form.last_name}
                handleChange={handleChange}
                errorMsg={errors.last_name}
              />
            </div>

            <div className="mb-2">
              <TextBox
                placeholder={"Address"}
                icon={<FaAddressBook />}
                field={"address"}
                value={form.address}
                handleChange={handleChange}
                errorMsg={errors.address}
              />
            </div>

            <div className="mb-2">
              <TextBox
                placeholder={"Email"}
                icon={<FaEnvelope />}
                field={"email"}
                value={form.email}
                handleChange={handleChange}
                errorMsg={errors.email}
              />
            </div>

            <div className="mb-2">
              <TextBox
                placeholder={"Contact Number"}
                icon={<FaPhone />}
                field={"contact_num"}
                value={form.contact_num}
                handleChange={handleChange}
                errorMsg={errors.contact_num}
              />
            </div>

            <div className="mb-2">
              <TextBox
                type={"password"}
                placeholder={"Password"}
                icon={<FaLock />}
                field={"password"}
                value={form.password}
                handleChange={handleChange}
                errorMsg={errors.password}
              />
            </div>
            
            <div className="mb-2">
              <TextBox
                type={"password"}
                placeholder={"Confirm Password"}
                icon={<FaLock />}
                field={"password_confirmation"}
                value={form.password_confirmation}
                handleChange={handleChange}
                errorMsg={errors.password_confirmation}
              />
            </div>

            <div className="text-right">
              <button
                onClick={(e) => register(e)}
                className="bg-green-500 text-white px-8 py-2 rounded"
              >
                Register
              </button>
            </div>

            <div className="text-center pb-3 py-6">
              <sub className="flex justify-center">
                <p className="mr-1">Already have account? </p>
                <Link to={"/login"}>
                  <p className="text-blue-500 hover:underline">Sign In</p>
                </Link>
              </sub>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
