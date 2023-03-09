import React from "react";
import bg from "../assets/img/testbg.jpg";
import title from "../assets/img/title.png";

const Showcase = () => {
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto">
        <div className="pt-24">
          <img src={title} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Showcase;
