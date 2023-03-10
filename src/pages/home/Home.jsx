import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllProducts,
  selectProductsData,
} from "../../features/product/productSlice";

import Banner from "../../components/banner/Banner";
import Products from "../../components/products/Products";
import Categories from "../../components/categories/Categories";

import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector(selectProductsData);

  useEffect(() => {
    dispatch(getAllProducts({ limit: 8, popular: true }));
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

export default Home;
