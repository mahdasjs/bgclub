import axios from "axios";

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
export const handlePlayprofile = async () => {
    return await axios.get(
        `https://5fac415503a60500167e7b7f.mockapi.io/api/v1/profile/1`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    };