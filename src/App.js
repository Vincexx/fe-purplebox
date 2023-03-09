import Header from "./components/Header";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import ListProducts from "./pages/ListProducts";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import Footer from "./components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { RingLoader } from "react-spinners";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import axios from "axios";
import CustomizeCake from "./pages/CustomizeCake";
import About from "./pages/About";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  // const token = "";
  return token;
};

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div
        className={`z-10 bg-indigo-500 absolute w-full h-screen flex justify-center items-center transition-all duration-1000 ${
          loading ? "top-[-1px]" : "top-[-900px] opacity-0"
        }`}
      >
        <RingLoader color={"#ffffff"} loading={loading} size={80} />
      </div>
      <div className="flex flex-col justify-between">
        <Header />
        <div className=" overflow-hidden">
          <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/about-us" element={<About />}></Route>
            <Route path="product/:product_id" element={<Product />}></Route>
            <Route path="/customize-cake" element={<CustomizeCake />} />
            <Route path="/cart/:user_id" element={<Cart />}></Route>
            <Route element={<PrivateRoutes />}>
              <Route index path="/dashboard" element={<Dashboard />} exact />
              <Route path="/users" element={<User />} />
              <Route path="/list-products" element={<ListProducts />} />
              <Route path="/orders" element={<Order />} />
              
            </Route>

            <Route element={<PublicRoutes />}>
              <Route index path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route index path="*" element={<Index />}></Route>
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
