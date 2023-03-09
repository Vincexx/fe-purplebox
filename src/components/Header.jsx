import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaWindowClose,
  FaHamburger,
  FaCheck,
  FaCartPlus,
} from "react-icons/fa";
import { useEffect } from "react";
import { useAuth } from "../App";
import Modal from "./AlertModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../store/order-slice";
import { fetchUsersCake } from "../store/custom-cake-slice";
import logo from "../assets/img/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const token = useAuth();
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const { usersCart } = useSelector((state) => state.order);
  const { usersCakes } = useSelector((state) => state.customCake);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserCart("onCart"));
    dispatch(fetchUsersCake("onCart"));
    console.log(usersCart);
  }, [token]);

  const [open, setOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const logout = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/logout`)
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("authUser");
        setLoggedOut(true);
        navigate("/login");
        window.location.reload();
      })
      .catch((err) => console.log(err.response.data));
  };

  const allRoutes = [
    { name: "About Us", link: "/about-us" },
    {
      name: "Contacts",
      link: "",
    },
  ];
  const pblicRoute = [];
  const publicRoutes = authUser?.role === "Admin" ? pblicRoute : [];
  const privateRoutes = [
    { name: "Login", link: "/login" },
    {
      name: "Register",
      link: "/register",
    },
  ];
  const navs = !token
    ? [...allRoutes, ...privateRoutes]
    : [...allRoutes, ...publicRoutes];

  return (
    <>
      {loggedOut && (
        <Modal
          icon={<FaCheck className="text-green-500 text-4xl" />}
          status={"Success"}
          message={"Logged out"}
        />
      )}
      <div className="shadow-md w-full top-0 left-0 relative z-10 bg-violet-500">
        <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
          <Link to={"/"}>
            <div className="w-16">
              <img src={logo} alt="gravitas" />
            </div>
          </Link>

          <div className="cursor-pointer" onClick={() => setOpen(!open)}>
            {open ? (
              <FaWindowClose className="text-2xl text-green-500 absolute right-8 top-5 md:hidden" />
            ) : (
              <FaHamburger className="text-2xl text-green-500 absolute right-8 top-5 md:hidden" />
            )}
          </div>

          <ul
            className={`bg-violet-500 shadow-md md:shadow-none md:flex md:items-center absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 md:pb-0 pb-7 transition-all duration-500 ease-in
          ${
            open
              ? "top-20 opacity-100"
              : "top-[-490px] md:opacity-100 opacity-0"
          }`}
          >
            {token && (
              <li className="text-white cursor-pointer my-7 md:my-0 md:ml-8 text-md  hover:text-green-500 transition-all duration-100 font-thin">
                Hi {authUser?.first_name}!
              </li>
            )}

            {navs.map((item, id) => (
              <li
                className="my-7 md:my-0 md:ml-8 text-md text-white hover:text-green-500 transition-all duration-100 font-thin"
                key={id}
              >
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}

            {authUser?.role === "User" && (
              <li
                onClick={logout}
                className="cursor-pointer my-7 md:my-0 md:ml-8 text-md text-white hover:text-green-500 transition-all duration-100 font-thin"
              >
                Logout
              </li>
            )}

            {token && authUser?.role !== "Admin" ? (
              <div className="ml-8 relative">
                <Link to={`/cart/${authUser.id}`}>
                  <FaCartPlus className="text-2xl" />
                </Link>
                <p className=" text-white bg-red-500 rounded-full text-center text-sm absolute -top-3 -right-2 font-bold px-1">
                  {usersCart?.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
