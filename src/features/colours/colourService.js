import { makeRequest } from "../../utils/makeRequest";

const getColors = async () => {
  const response = await makeRequest.get("/colors");

  return response;
};

const colorsService = { getColors };

export default colorsService;
