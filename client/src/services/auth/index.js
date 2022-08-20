import axios from "axios";
import { SERVER1_API_URL } from "../../config";

export const login = async (data) => {
  return await axios
    .post(`${SERVER1_API_URL}/Authenticate`, data, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((e) => console.error(e));
};

export const register = async (data) => {
  return await axios
    .post(`${SERVER1_API_URL}/Signup`, data, {
      headers: { "Content-Type": "text/plain" },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.error(e);
    });
};
