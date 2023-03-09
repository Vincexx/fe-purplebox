import React, { useState } from "react";
import {
  FaUserFriends,
  FaHandHolding,
  FaBirthdayCake,
  FaPowerOff,
  FaCheck,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./AlertModal";

const Sidebar = () => {
  const navs = [
    {
      name: "Orders",
      logo: <FaHandHolding className="text-md" />,
      path: "/orders",
    },
    {
      name: "Users",
      logo: <FaUserFriends className="text-md" />,
      path: "/users",
    },
    {
      name: "Products",
      logo: <FaBirthdayCake className="text-md" />,
      path: "/list-products",
    },
  ];

  const [loggedout, setLoggedout] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/logout`)
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("authUser");
        setLoggedout(true);
        navigate("/login");
        window.location.reload();
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <>
      {loggedout && (
        <Modal
          icon={<FaCheck className="text-green-500 text-4xl" />}
          status={"Success"}
          message={"Logged out Successful"}
        />
      )}

      <div className=" md:pl-10 md:pr-5 md:w-3/12">
        <ul className="flex justify-between items-center md:block">
          {navs.map((item, id) => (
            <Link key={id} to={item.path} className="w-full">
              <li
                className="md:pl-3 py-5 border-b-2 hover:bg-green-400 transition-all duration-100 flex items-center justify-center md:justify-start"
                key={id}
              >
                {item.logo}
                <p className="hidden md:block ml-1 text-sm">{item.name}</p>
              </li>
            </Link>
          ))}

          <li
            onClick={logout}
            className="md:pl-3 py-5 border-b-2 hover:bg-green-400 transition-all duration-100 flex items-center justify-center md:justify-start"
          >
            <FaPowerOff className="text-md" />
            <p className="hidden md:block ml-1 text-sm">Logout</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
