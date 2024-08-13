import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const findUserById = async (userId: string) => {
  console.log(`Calling findUserById with userId: ${userId}`);
  console.log(`Full API URL: ${USERS_API}/${userId}`);
  try {
    const response = await axios.get(`${USERS_API}/${userId}`, { withCredentials: true });
    console.log('findUserById response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in findUserById:', error);
    throw error;
  }
};

export const getFollowStatus = async (loggedInUserId: string, profileUserId: string) => {
  console.log(`Calling getFollowStatus with loggedInUserId: ${loggedInUserId} and profileUserId: ${profileUserId}`);
  console.log(`Full API URL: ${USERS_API}/${loggedInUserId}/following/${profileUserId}`);
  try {
    const response = await axios.get(
      `${USERS_API}/${loggedInUserId}/following/${profileUserId}`,
      { withCredentials: true }
    );
    console.log('getFollowStatus response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getFollowStatus:', error);
    throw error;
  }
};
export const updateUser = async (userId: any, updateData: any) => {
  const response = await axios.put(`${USERS_API}/${userId}`, updateData); 
  return response.data;   
};

export const followUser = async (loggedInUserId: string, profileUserId: string) => {
  try {
    const response = await axios.post(`${USERS_API}/${loggedInUserId}/following/${profileUserId}`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error in followUser:', error);
    throw error;
  }
};

export const unfollowUser = async (loggedInUserId: string, profileUserId: string) => {
  try {
    const response = await axios.delete(`${USERS_API}/${loggedInUserId}/following/${profileUserId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error in unfollowUser:', error);
    throw error;
  }
};
