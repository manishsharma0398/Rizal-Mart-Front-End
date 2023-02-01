import { makeRequest } from "../../utils/makeRequest";

const getCoupons = async () => {
  const response = await makeRequest.get("/coupon/all");

  return response;
};

const couponService = { getCoupons };

export default couponService;
