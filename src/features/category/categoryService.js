import { makeRequest } from "../../utils/makeRequest";

const getCategories = async () => {
  const response = await makeRequest.get("/category");

  return response;
};

const categoryService = { getCategories };

export default categoryService;
