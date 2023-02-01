import { makeRequest } from "../../utils/makeRequest";

const getProducts = async () => {
  const response = await makeRequest.get("/product");

  return response;
};

const productsService = { getProducts };

export default productsService;
