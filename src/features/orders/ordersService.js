import { privateRequest, publicRequest } from "../../utils/APIRequest";

const getOrders = async () => {
  const response = await publicRequest.get("/order");

  return response;
};

const orderService = { getOrders };

export default orderService;
