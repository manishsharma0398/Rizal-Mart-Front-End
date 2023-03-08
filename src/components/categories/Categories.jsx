import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCategoriesData } from "../../features/category/categorySlice";

import "./Categories.scss";

const Categories = () => {
  const categories = useSelector(selectCategoriesData);

  return (
    <div className="shop-by-category">
      <div className="categories">
        {categories.map((category, i) => (
          <div key={i} className="category">
            <Link to={`/products/?category=${category?._id}`}>
              {category?.category}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Categories;
