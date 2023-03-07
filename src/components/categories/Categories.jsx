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
            {/* <img src={Cat1} alt="" /> */}
            <Link to={`/products/?category=${category?._id}`}>
              {category?.category}
            </Link>
          </div>
        ))}
      </div>
      {/* <div className="categories-menu">
        <div className="container">
          {categories.map((category, i) => {
            return (
              <Link
                to={`/products/?category=${category.name.toLowerCase()}`}
                key={i}
                className="categories-menu-item"
              >
                <img src={category.img} alt={category.name} />
                <p>{category.name}</p>
              </Link>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};
export default Categories;
