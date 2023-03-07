import { FaShippingFast } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { SlEarphonesAlt } from "react-icons/sl";
import { TbDiscount2 } from "react-icons/tb";
import { AiOutlineCreditCard } from "react-icons/ai";

import Banner from "../../components/banner/Banner";
import Products from "../../components/products/Products";
import Categories from "../../components/categories/Categories";

import "./Home.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  selectProductsData,
} from "../../features/product/productSlice";
import { getAllCategories } from "../../features/category/categorySlice";

const Home = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector(selectProductsData);

  useEffect(() => {
    dispatch(getAllProducts({ limit: 8, popular: true }));
    dispatch(getAllCategories());
  }, []);

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Categories />
          <Products headingText="Popular Products" products={allProducts} />
        </div>
      </div>
    </div>
  );
};

const Home2 = () => {
  const data = [
    { image: <FaShippingFast />, text: "Free Shipping" },
    { image: <FiGift />, text: "Daily Surprise Offers" },
    { image: <SlEarphonesAlt />, text: "Support 24/7" },
    { image: <TbDiscount2 />, text: "Affordable Prices" },
    { image: <AiOutlineCreditCard />, text: "Secure Payments" },
  ];

  return (
    <div className="banners container d-flex justify-content-between py-5">
      {data.map((d, i) => {
        const { image, text } = d;
        return (
          <div
            key={i}
            className="banner d-flex gap-3 align-items-end flex-wrap p-2"
          >
            <p className="fs-3 m-0 p-0">{image}</p>
            <div className="details">
              <p className="m-0 p-0 fw-bold fs-5 lh-1 text-center">{text}</p>
              <p className="m-0 p-0 small text-center">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
