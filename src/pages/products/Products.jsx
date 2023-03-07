import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import Products from "../../components/products/Products";
import {
  getAllCategories,
  selectCategoriesData,
} from "../../features/category/categorySlice";
import {
  getAllProducts,
  selectProductsData,
} from "../../features/product/productSlice";

import "./Products.scss";

const Category = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const categoryId = location.search.split("=")[1];
  const categories = useSelector(selectCategoriesData) || [];

  const products = useSelector(selectProductsData);

  useEffect(() => {
    if (!categories || categories?.length < 1) {
      dispatch(getAllCategories());
    }
    const d = categories.filter((cat) => cat._id === categoryId);
    console.log(d);
    console.log(location);
    dispatch(getAllProducts({ categories: categoryId }));
  }, [categoryId]);

  return (
    <div className="category-main-content">
      <div className="layout">
        {/* <div className="category-title">Category Title</div> */}
        <Products
          headingText={
            categories?.filter((cat) => cat._id === categoryId)[0]?.category
          }
          products={products || []}
        />
      </div>
    </div>
  );
};
export default Category;
