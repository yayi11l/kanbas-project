import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const POSTS_API = `${REMOTE_SERVER}/api/posts`;

export const createPost = async (post: any) => {
    const response = await axios.post(POSTS_API, post);
    return response.data;
};

export const deletePost = async (postId: string) => {
    const response = await axios.delete(`${POSTS_API}/${postId}`);
    return response.data;
};

export const fetchPosts = async () => {
    const response = await axios.get(POSTS_API);
    return response.data;
};

export const updatePost = async (post: any) => {
    const response = await axios.put(`${POSTS_API}/${post._id}`, post);
    return response.data;
};