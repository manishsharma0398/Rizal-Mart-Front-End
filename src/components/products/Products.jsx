import Product from "./product/Product";

import "./Products.scss";

const Products = ({ headingText, products }) => {
  return (
    <div className="products-container">
      {headingText && <div className="sec-heading">{headingText}</div>}
      <div className="products">
        {products.map((product) => (
          <Product key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Products;
