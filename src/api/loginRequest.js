import axios from "axios";
import { url } from "./api";
import { storeSession } from "../utils/sessionUtils";

const loginApi = async (userData) => {
  const response = await axios.post(url, userData);
  return response.data;
};


export default loginApi;