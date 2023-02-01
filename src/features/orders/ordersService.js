import { makeRequest } from "../../utils/makeRequest";

const getOrders = async () => {
  const response = await makeRequest.get("/order");

  return response;
};

const orderService = { getOrders };

export default orderService;
