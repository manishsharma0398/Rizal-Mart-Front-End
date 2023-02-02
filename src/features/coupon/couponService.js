import { axiosHeader, makeRequest } from "../../utils/makeRequest";

const getCoupons = async () => {
  const response = await makeRequest.get("/coupon/all");

  return response;
};

const addCoupon = async (newCouponData) => {
  const response = await makeRequest.post(
    "/coupon",
    newCouponData,
    axiosHeader
  );

  return response;
};

const couponService = { getCoupons, addCoupon };

export default couponService;
