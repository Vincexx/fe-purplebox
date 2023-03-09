import React from "react";
import almond from "../assets/img/almond.jpg";
import { FaFunnelDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/product-slice";
import { useState } from "react";
import banner from "../assets/img/banner.jpg";
import { useAuth } from "../App";
import ListOfCustomCakes from "../components/ListOfCustomCakes";

const ListProducts = () => {
  const token = useAuth();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [showCake, setshowCake] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts("All"));
  }, [products]);

  const { allProducts } = useSelector((state) => state.product);

  const handleSelect = (e) => {
    e.preventDefault();
    let select = e.target.value;
    if (select === "Cakes") setshowCake(false);
    else if (select === "Beverages") setshowCake(false);
    else if (select === "CustomCakes") {
      setshowCake(true);
    }
    dispatch(fetchProducts(select));
  };

  return (
    <>
      <div
        className="py-6"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto">
          <div>
            <div className="bg-violet-500 py-4 px-2 flex justify-between items-center">
              <div className="flex items-center">
                <FaFunnelDollar className="text-white mr-1" />
                <p className="text-white">
                  Choose your desired Cake / Beverages
                </p>
              </div>
              <div>
                <select
                  onChange={(e) => handleSelect(e)}
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="Cakes">Cakes</option>
                  <option value="Beverages">Beverages </option>
                  <option value="CustomCakes">Customized Cakes </option>
                </select>
              </div>
            </div>
            {showCake && (
              <>
                <div>
                  <Link to={!token ? `/login` : `/customize-cake`}>
                    <button className="bg-indigo-500 py-3 px-6 text-white my-3 hover:bg-green-500">
                      Customize Cake +
                    </button>
                  </Link>
                </div>

                <ListOfCustomCakes />
              </>
            )}
            <div className="grid md:grid-cols-4 md:gap-3 gap-5 my-3">
              {allProducts &&
                allProducts.map((item, index) => (
                  <div
                    key={index}
                    className="shadow-md px-4 py-4 flex flex-col justify-center items-center hover:scale-105 transition-all duration-200 bg-white rounded"
                  >
                    <Link to={`/product/${item.id}`}>
                      <div>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/storage/${item.image}`}
                          alt="almond"
                        />
                        <div className="mt-3">
                          <h1 className="font-bold text-xl">{item.name}</h1>
                          <p className="">₱{item.price}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProducts;
