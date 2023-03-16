import { useDispatch, useSelector } from "react-redux";
import {
  removeProductFromOrders,
  selectOrderProducts,
  updateProductCount,
} from "../../../features/orders/ordersSlice";
import "./CheckoutProducts.scss";
import { MdClose } from "react-icons/md";
import { convertToIndianNumberFormat } from "../../../utils/numberFunctions";

const CheckoutProduct = ({ cartProduct }) => {
  const dispatch = useDispatch();

  const handleProductQuantityChange = (type) => {
    const updatedProduct = {
      ...cartProduct,
      count:
        type === "increment" ? cartProduct.count + 1 : cartProduct.count - 1,
    };
    dispatch(updateProductCount(updatedProduct));
  };

  const { product, count, _id } = cartProduct;
  return (
    <div key={_id} className="cart-product">
      <div className="img-container">
        <img
          src={product && product?.images?.length && product?.images[0]?.url}
          alt={product?.title}
        />
      </div>
      <div className="prod-details">
        <span className="name">{product?.title}</span>
        <MdClose
          onClick={() => dispatch(removeProductFromOrders(product?._id))}
          className="close-btn"
        />
        <div className="quantity-buttons">
          <span onClick={() => handleProductQuantityChange("decrement")}>
            -
          </span>
          <span>{count}</span>
          <span onClick={() => handleProductQuantityChange("increment")}>
            +
          </span>
        </div>

        <div className="text">
          <span>{count}</span>
          <span>x</span>
          <span className="highlight">
            &#8377; {convertToIndianNumberFormat(product?.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

const CheckoutProducts = ({ fromCart }) => {
  const productOrders = useSelector(selectOrderProducts);

  return (
    <>
      {fromCart && (
        <div className="cart-products">
          {productOrders?.map((cartProduct) => {
            return (
              <CheckoutProduct
                key={cartProduct._id}
                cartProduct={cartProduct}
              />
            );
          })}
        </div>
      )}
      <span className="total">
        {productOrders.reduce(
          (acc, order) => acc + order.count * order.product.price,
          0
        )}
      </span>
    </>
  );
};
export default CheckoutProducts;
