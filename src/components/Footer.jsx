import React from "react";
import {
  FaPhone,
  FaAddressBook,
  FaBusinessTime,
  FaNetworkWired,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-slate-800">
      <div className="py-6 container mx-auto">
        <div className="flex flex-col justify-between gap-3 md:md-6 md:flex-row md:items-center">
          <div className="text-gray-400">
            <h1 className="font-bold">Address:</h1>
            <div className="flex items-center  text-sm">
              <FaAddressBook className=" mr-1" />
              <p className="">
                710 Paterno St. Caridad 4100 Cavite City, Philippines
              </p>
            </div>
          </div>
          <div className="text-gray-400">
            <h1 className="font-bold">Operating Hours:</h1>
            <div className="flex items-center  text-sm">
              <FaBusinessTime className=" mr-1" />
              <p className="">Monday-Sunday, 11am-8pm</p>
            </div>
          </div>
          <div className="text-gray-400">
            <h1 className="font-bold">Contact Number:</h1>
            <div className="flex items-center  text-sm">
              <FaPhone className=" mr-1" />
              <p className="">+639262522057</p>
            </div>
          </div>
          <div className="text-gray-400">
            <h1 className="font-bold">Follow Us:</h1>
            <div className="flex items-center  text-sm">
              <div className="flex">
                <FaFacebook className="mr-1 text-2xl" />
                <FaInstagram className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
