import axios from "axios";
import Cookie from "js-cookie";

export const handlePosts = async () => {
  return await axios.get(
    `http://localhost:8000/posts/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
  export const userList = async () => {
      return await axios.get(
        "http://localhost:8000/api/v1/accounts/users/", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
      };