import { privateRequest } from "../../utils/APIRequest";

const getColors = async () => {
  const response = await privateRequest.get("/colors");

  return response;
};

const colorsService = { getColors };

export default colorsService;
