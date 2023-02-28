import { privateRequest, publicRequest } from "../../utils/APIRequest";

const getProducts = async (queries) => {
  const { category } = queries;
  const response = await publicRequest.get(
    `/products/?category=${category || ""}`
  );
  return response;
};

const addProduct = async (newProduct) => {
  const response = await privateRequest.post("/product", newProduct);

  return response;
};

const productsService = { getProducts, addProduct };

export default productsService;
