import { useState } from "react";

import "./CartQuantityController.scss";

const CartQuantityController = () => {
  const [productQuantityInCart, setProductQuantityInCart] = useState(1);

  const addProductToCartHandler = () => {
    dispatch(addToCart({ productId, quantity: productQuantityInCart }));
  };

  const productQuantityHandler = (type) => {
    console.log(type);
    const MIN = 1;
    const MAX = 10;

    if (type === "increment") {
      if (productQuantityInCart >= MAX) return;
      setProductQuantityInCart((quantity) => quantity + 1);
    }
    if (type === "decrement") {
      if (productQuantityInCart <= MIN) return;
      setProductQuantityInCart((quantity) => quantity - 1);
    }
  };

  return (
    <div className="quantity-buttons">
      <span onClick={() => productQuantityHandler("decrement")}>-</span>
      <span>{productQuantityInCart}</span>
      <span onClick={() => productQuantityHandler("increment")}>+</span>
    </div>
  );
};
export default CartQuantityController;
