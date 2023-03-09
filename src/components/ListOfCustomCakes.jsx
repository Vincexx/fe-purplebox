import React from "react";
import { customCakes } from "../helper/ListOfCustomCakes";

const ListOfCustomCakes = () => {
  return (
    <>
      <div className="grid md:grid-cols-4 md:gap-3 gap-5 my-3">
        {customCakes.map((item, index) => (
          <div
            key={index}
            className="shadow-md px-4 py-4 flex flex-col justify-center items-center hover:scale-105 transition-all duration-200 bg-white rounded"
          >
            <div>
              <img src={item.image} alt="almond" />
              <div className="mt-3">
                <h1 className="font-bold text-xl">{item.name}</h1>
                {/* <p className="">₱{item.price}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListOfCustomCakes;
