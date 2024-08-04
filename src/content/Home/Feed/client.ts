import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
export const POSTS_API = `${REMOTE_SERVER}/api/posts`;

export const fetchAllPosts = async () => {
  const { data } = await axiosWithCredentials.get(POSTS_API);
  return data;
};

export const fetchPostById = async (postId: any) => {
  const { data } = await axiosWithCredentials.get(`${POSTS_API}/${postId}`);
  return data;
};

export const likePost = async (postId : any, userId : any) => {
  const { data } = await axiosWithCredentials.post(`${POSTS_API}/${postId}/like`, { userId });
  return data;
};

export const unlikePost = async (postId : any, userId : any) => {
  const { data } = await axiosWithCredentials.post(`${POSTS_API}/${postId}/unlike`, { userId });
  return data;
};

export const addComment = async (postId : any, comment : any) => {
  const { data } = await axiosWithCredentials.post(`${POSTS_API}/${postId}/comment`, { comment });
  return data;
};

export const removeComment = async (postId : any, commentId : any) => {
  const { data } = await axiosWithCredentials.delete(`${POSTS_API}/${postId}/comment/${commentId}`);
  return data;
};

export const sharePost = async (postId : any) => {
  const { data } = await axiosWithCredentials.post(`${POSTS_API}/${postId}/share`);
  return data;
};
