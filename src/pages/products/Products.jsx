import Products from "../../components/products/Products";

import "./Products.scss";

const Category = () => {
  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">Category Title</div>
        <Products />
      </div>
    </div>
  );
};
export default Category;
