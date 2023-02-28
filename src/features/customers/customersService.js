import { privateRequest, publicRequest } from "../../utils/APIRequest";

const getUsers = async () => {
  const response = await publicRequest.get("/user/all");
  return response;
};

const customerService = { getUsers };

export default customerService;
