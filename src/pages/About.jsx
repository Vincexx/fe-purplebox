import React from "react";
import bg from "../assets/img/banner.jpg";
import aboutImg from "../assets/img/aboutUs.PNG";

const About = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto">
          <div className="h-screen flex items-center justify-center">
            <div className="md:flex items-center justify-center gap-3">
              <div className="flex justify-center mb-3 md:mb-0 md:basis-3/6">
                <img src={aboutImg} alt="aboutUs" className="w-3/4" />
              </div>
              <div className="bg-white rounded p-12 self-start md:basis-3/6">
                <h1 className="font-thin text-3xl text-violet-500 mb-5">
                  About Us
                </h1>
                <p className="mb-3 font-bold">
                  Special homemade baked goodies. Customize your own cake with
                  us!
                </p>
                <p className="leading-8">
                  Whether you're planning to bake a big confection to feast
                  friends, celebrate a birthday, mark an anniversary—or for no
                  special reason at all, we've got dozens of cake recipes to
                  choose from. From whimsical homemade cake decorating ideas and
                  cupcake decorating ideas to quick, simple cakes, there's
                  something here to spark your imagination and get you in the
                  baking spirit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
