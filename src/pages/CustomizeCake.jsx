import React from "react";
import { FaCheck, FaSkull } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { customCakeActions, saveCustomCake } from "../store/custom-cake-slice";
import AlertModal from "../components/AlertModal";
import { useAuth } from "../App";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { addToCart, orderActions } from "../store/order-slice";
import { useEffect } from "react";

const CustomizeCake = () => {
  let token = useAuth();
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const { form, success, failed } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const requiredFields = [
    "delivery_date",
    "delivery_address",
    "quantity",
    "message",
    "remarks",
    "image",
  ];
  var formData = new FormData();

  useEffect(() => {}, [success, failed]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(orderActions.setForm({ name, value }));
  };

  const getFile = async (e) => {
    e.preventDefault();
    await formData.append("image", e.target.files[0]);
  };

  const addCart = async (e) => {
    e.preventDefault();

    if (!token) navigate("/login");
    else {
      Object.keys(form).map((item) => {
        console.log(form[item])
        if (item !== "image") formData.append(item, form[item]);
      });
      formData.append("status", "onCart");
      formData.append("type", "customized-cake");

      await validate();
    }
  };

  const goAddCart = (isValidData) => {
    if (isValidData) {
      dispatch(addToCart(formData));
      dispatch(orderActions.resetForm());
      dispatch(orderActions.setSuccess(true));

      setTimeout(() => {
        dispatch(orderActions.setSuccess(false));
        navigate(`/cart/${authUser?.id}`);
      }, 1000);
    }
  };

  const validate = async () => {
    let isValidData = true;
    await requiredFields.forEach((item, index) => {
      if (index < requiredFields.length && isValidData) {
        if (!formData.get(item)) {
          isValidData = false;
          dispatch(orderActions.setFailed(true));
        }
      }
    });

    goAddCart(isValidData);
  };

  return (
    <>
      {success && (
        <AlertModal
          icon={<FaCheck className="text-green-500 text-4xl" />}
          status={"Success"}
          message={
            "Item added to cart. The seller will update the price for this customize cake."
          }
          button={"Okay"}
          actions={orderActions}
        />
      )}

      {failed && (
        <AlertModal
          icon={<FaSkull className="text-red-500 text-4xl" />}
          status={"Failed"}
          message={"Please complete all required fields."}
          button={"Okay"}
          actions={orderActions}
        />
      )}

      <div className="md:h-screen flex items-center justify-center">
        <div className="md:flex items-center gap-10 my-12 md:my-0 md:mx-24  w-full justify-between ">
          {/* <img src={!preview ? unknown : preview} alt="cake" className="mb-3 md:mb-0" style={{ width: '400px', height:'500px' }} /> */}
          <div className="self-start w-full">
            <Link to="/">
              <div className="flex items-center mb-6 cursor-pointer">
                <FaArrowLeft className="mr-2" />
                <p>Back</p>
              </div>
            </Link>
            <p className="font-bold text-2xl text-indigo-500 mb-3">
              Customize Cake
            </p>

            <div className="my-3">
              <div className="flex">
                <input
                  type="date"
                  placeholder="Delivery Date"
                  name="delivery_date"
                  className="py-3 px-5 border w-full text-gray-500 mr-3"
                  value={form.delivery_date}
                  onChange={(e) => handleChange(e)}
                />

                <input
                  type="text"
                  placeholder="Delivery Address"
                  name="delivery_address"
                  className="py-3 px-5 border w-full text-gray-500"
                  value={form.delivery_address}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>

            <div>
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                className="py-3 px-5 border w-full text-gray-500"
                value={form.quantity}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="What Message Would You Like On The Cake?"
                name="message"
                className="py-3 px-5 border w-full text-gray-500"
                value={form.message}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="my-3">
              <textarea
                name="remarks"
                id="remarks"
                cols="30"
                rows="10"
                className="border w-full py-3 px-5"
                placeholder="Remarks"
                value={form.remarks}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>

            <div className="my-3">
              <input
                type="file"
                placeholder="Upload Image"
                name="image"
                onChange={(e) => getFile(e)}
                accept="image/png, image/gif, image/jpeg"
                className="text-gray-500 border py-3 pr-3 pl-10 rounded-md shadow-md w-full focus:outline-none"
              />
            </div>
            <div>
              <button
                onClick={(e) => addCart(e)}
                className="py-3 px-5 bg-indigo-500 text-white w-full "
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

export default CustomizeCake;
