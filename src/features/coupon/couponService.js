import { privateRequest, publicRequest } from "../../utils/APIRequest";

const getCoupons = async () => {
  const response = await privateRequest.get("/coupon/all");
  return response;
};

const addCoupon = async (newCouponData) => {
  const response = await privateRequest.post("/coupon", newCouponData);
  return response;
};

const deleteCoupon = async (couponId) => {
  const response = await privateRequest.delete(`/coupon/${couponId}`);
  return response;
};

const updateCoupon = async (data) => {
  const { id, ...other } = data;
  const response = await privateRequest.put(`/coupon/${id}`, other);
  return response;
};

const getACoupon = async (couponId) => {
  const response = await publicRequest.get(`/coupon/${couponId}`);
  return response;
};

const couponService = {
  addCoupon,
  getACoupon,
  getCoupons,
  deleteCoupon,
  updateCoupon,
};

export default couponService;
