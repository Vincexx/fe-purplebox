import React from "react";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../App";
import Modal from "../components/AlertModal";
import {
  addToCart,
  getUserCart,
  orderActions,
  updateOrderIfExist,
} from "../store/order-slice";
import { getProduct } from "../store/product-slice";

const Product = () => {
  let token = useAuth();
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const navigate = useNavigate();
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { form, success, usersCart } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getProduct(product_id));
    const value = product_id;
    const name = "product_id";
    dispatch(orderActions.setForm({ name, value }));
    dispatch(getUserCart("Paid"));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(orderActions.setForm({ name, value }));
  };

  const addCart = async (e) => {
    e.preventDefault();
    try {
      if (!token) navigate("/login");
      else {
        const isExist = await usersCart.find(
          (item) => item.product_id === parseInt(product_id)
        );
        if (!isExist || isExist.status !== "onCart") dispatch(addToCart(form));
        else dispatch(updateOrderIfExist(form));

        dispatch(orderActions.setSuccess(true));
        setTimeout(() => {
          dispatch(orderActions.resetForm());
        }, 1000);

        setTimeout(() => {
          dispatch(orderActions.setSuccess(false));
          navigate(`/cart/${authUser?.id}`);
        }, 1000);
      }
    } catch (e) {
      console.log("Failed!");
    }
  };

  return (
    <>
      {success && (
        <Modal
          icon={<FaCheck className="text-green-500 text-4xl" />}
          status={"Success"}
          message={"Added Cart Successful"}
        />
      )}

      <div className="md:h-screen flex items-center justify-center">
        <div className="md:flex items-center gap-10 my-12 md:my-0 md:mx-24  w-full justify-between ">
          <img
            src={`${process.env.REACT_APP_API_URL}/storage/${product.image}`}
            alt="cake"
            className="mb-3 md:mb-0"
          />
          <div className="self-start w-full">
            <p className="font-bold text-2xl text-indigo-500">{product.name}</p>

            <p className="text-gray-500 my-3">
              <span className="font-bold">Description:</span>{" "}
              {product.description}
            </p>

            <p className="text-gray-500">
              <span className="font-bold">Price:</span> ₱{product.price}.00
            </p>

            {product.type === "Cakes" && (
              <div className="my-3">
                <input
                  type="text"
                  placeholder="What Message Would You Like On The Cake?"
                  name="message"
                  value={form.message}
                  onChange={(e) => handleChange(e)}
                  className="py-3 px-5 border w-full placeholder-black"
                />
              </div>
            )}

            <div className="mt-3 flex justify-between">
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={form.quantity}
                className="py-3 px-5 border w-9/12 placeholder-black"
                onChange={(e) => handleChange(e)}
              />

              <button
                onClick={(e) => addCart(e)}
                className="py-3 px-5 bg-indigo-500 text-white w-2/12 "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
