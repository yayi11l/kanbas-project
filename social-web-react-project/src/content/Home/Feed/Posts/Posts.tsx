import { useEffect, useState } from "react";
import Post from "./Post";
import * as client from "../client";
import InputBox from "../InputBox";
import { BsCheckLg } from "react-icons/bs";

export default function Posts() {
  const [realtimePosts, setRealTimePosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const posts = await client.fetchAllPosts(); // Fetch real posts from your API
      setRealTimePosts(posts);
      console.log(posts);
    } catch (error) {
      setError("Error fetching posts.");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleNewPost = () => {
    fetchPosts(); // Refetch posts to include the new one
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (realtimePosts.length === 0) return <div className="text-center py-10">No posts available.</div>;

  return (
    <div className="space-y-4">
      <InputBox onNewPost={handleNewPost} />
      {realtimePosts.map((post: any) => (
        <Post
          key={post._id}
          pid={post._id}
          // user={post.user}
          // content={post.content}
          // images={post.images}
          // likes={post.likes}
          // comments={post.comments}
          // shareCount={post.shareCount}
          // createdAt={post.createdAt}
          // updatedAt={post.updatedAt}
        />
      ))}
    </div>
  );
}
