import Products from "../../components/products/Products";

import "./RelatedProducts.scss";

const RelatedProducts = () => {
  return (
    <div className="related-products">
      <Products products={[]} headingText="Related Products" />
    </div>
  );
};

export default RelatedProducts;
