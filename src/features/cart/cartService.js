import { privateRequest } from "../../utils/APIRequest";

const addToCart = async (data) => {
  const response = await privateRequest.post("/cart", data);
  return response;
};

const deleteFromCart = async (cartId) => {
  const response = await privateRequest.delete(`/cart/${cartId}`);
  return response;
};

const getCartItems = async () => {
  const response = await privateRequest.get(`/cart`);
  return response;
};

const cartService = { addToCart, deleteFromCart, getCartItems };

export default cartService;
