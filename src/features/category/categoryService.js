import { privateRequest, publicRequest } from "../../utils/APIRequest";

const getCategories = async () => {
  const response = await publicRequest.get("/category");
  return response;
};

const addCategory = async (newCategoryData) => {
  const response = await privateRequest.post("/category", newCategoryData);

  return response;
};

const categoryService = { getCategories, addCategory };

export default categoryService;
