import { privateRequest, publicRequest } from "../../utils/APIRequest";

const getCoupons = async () => {
  const response = await privateRequest.get("/coupon/all");
  return response;
};

const addCoupon = async (newCouponData) => {
  const response = await privateRequest.post("/coupon", newCouponData);
  return response;
};

const couponService = { getCoupons, addCoupon };

export default couponService;
