import { privateRequest } from "../../utils/APIRequest";

const getWishlist = async () => {
  const response = await privateRequest.get(`/wishlist`);
  return response;
};

const addToWishlist = async (prodId) => {
  const response = await privateRequest.post(`/wishlist`, prodId);
  return response;
};

const wishlistService = {
  getWishlist,
  addToWishlist,
};

export default wishlistService;
