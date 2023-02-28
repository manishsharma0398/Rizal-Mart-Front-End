import { Link } from "react-router-dom";

import Cat1 from "../../assets/category/cat-1.jpg";

import "./Categories.scss";

const categories = [
  {
    img: "https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
    name: "Grocery",
  },
  {
    img: "https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
    name: "Mobiles",
  },
  {
    img: "https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png?q=100",
    name: "Fashion",
  },
  {
    img: "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
    name: "Electronics",
  },
  {
    img: "https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
    name: "Home",
  },
  {
    img: "https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100",
    name: "Appliances",
  },
  {
    img: "https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100",
    name: "Top Offers",
  },
  {
    img: "https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
    name: "Beauty, Toys And More",
  },
];

const Categories = () => {
  return (
    <div className="shop-by-category">
      <div className="categories">
        {categories.map((category) => (
          <div className="category">
            <img src={Cat1} alt="" />
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
