import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const findUserById = async (userId: any) => {
  const response = await axios
    .get(`${USERS_API}/${userId}`);
  return response.data;
};

export const updateUser = async (userId: any, updateData: any) => {
  const response = await axios.put(`${USERS_API}/${userId}`, updateData); 
  return response.data;   
};
