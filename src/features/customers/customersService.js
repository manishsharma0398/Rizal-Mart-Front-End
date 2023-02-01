import { makeRequest } from "../../utils/makeRequest";

const getUsers = async () => {
  const response = await makeRequest.get("/user/all");

  return response;
};

const customerService = { getUsers };

export default customerService;
