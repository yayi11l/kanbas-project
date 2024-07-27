import { useEffect, useState } from "react";
import Post from "./Post";
    // Dummy data for testing
const samplePosts = [
      {
        id: 1,
        name: "John Doe",
        message: "Hello, this is a sample post!",
        email: "john@example.com",
        timestamp: "2024-07-23T10:30:00Z",
        image: "/path/to/profile1.jpg",
        postImage: "/path/to/post1.jpg"
      },
      {
        id: 2,
        name: "Jane Smith",
        message: "Another sample post with more content.",
        email: "jane@example.com",
        timestamp: "2024-07-23T11:00:00Z",
        image: "/path/to/profile2.jpg",
        postImage: "/path/to/post2.jpg"
      },
      {
        id: 3,
        name: "Alice Johnson",
        message: "Yet another sample post.",
        email: "alice@example.com",
        timestamp: "2024-07-23T12:00:00Z",
        image: "/path/to/profile3.jpg",
        postImage: "/path/to/post3.jpg"
      }
    ];

export default function Posts() {
  const [realtimePosts, setRealTimePosts] = useState<any>(samplePosts);

  useEffect(() => {
    setRealTimePosts(samplePosts);
  }, []);

  return (
    <div>
      {realtimePosts.map((post : any) => (
        <Post
          key={post.id}
          name={post.name}
          message={post.message}
          email={post.email}
          timestamp={post.timestamp}
          image={post.image}
          postImage={post.postImage}
        />
      )
      )}
    </div>
  )
}