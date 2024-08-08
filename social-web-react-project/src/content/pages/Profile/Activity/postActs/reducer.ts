import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  userId: string;
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  user: string;
  content: string;
  images: string[];
  likes: string[];
  comments: Comment[];
  reviews:string[];
  shareCount: number;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  reviews: string[];
}

interface PostsState {
  posts: Post[];
  user: User | null;
}

const initialState: PostsState = {
  posts: [],
  user: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    createPost: (state, action: PayloadAction<Omit<Post, "id">>) => {
      const post = action.payload;
      const newPost: Post = {
        ...post,
        id: new Date().toISOString(),
        createdAt: post.createdAt || new Date().toISOString(),
        updatedAt: post.updatedAt || new Date().toISOString()
      };
      state.posts.push(newPost);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const post = action.payload;
      state.posts = state.posts.map(p => p.id === post.id ? post : p);
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    addComment: (state, action: PayloadAction<{ postId: string; comment: Omit<Comment, "createdAt"> }>) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.comments.push({
          ...comment,
          createdAt: new Date().toISOString()
        });
      }
    },
    likePost: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post && !post.likes.includes(userId)) {
        post.likes.push(userId);
      }
    },
    unlikePost: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.likes = post.likes.filter(id => id !== userId);
      }
    },
    reviewPost: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      const { postId, userId } = action.payload;
      const user = state.user;
      if (user && !user.reviews.includes(postId)) {
        user.reviews.push(postId);
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  }
});

export const {
  setPosts,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost,
  unlikePost,
  reviewPost,
  setUser
} = postsSlice.actions;

export default postsSlice.reducer;
