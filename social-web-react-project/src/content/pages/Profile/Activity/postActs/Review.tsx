import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Post {
  _id: string;
  content: string;
  createdAt: string;
}

const fetchPost = async (postId: string): Promise<Post | null> => {
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    return response.json();
  }
  return null;
};

const Reviews: React.FC = () => {
  const [reviewedPosts, setReviewedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchReviewedPosts = async () => {
      try {
        const userResponse = await fetch(`/api/users/${userId}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        const posts: Post[] = [];
        for (const postId of userData.reviews) {
          const post = await fetchPost(postId);
          if (post) {
            posts.push(post);
          }
        }
        setReviewedPosts(posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewedPosts();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="web-social-review">
      <h3>Reviewed Posts</h3>
      <ul>
        {reviewedPosts.map((post) => (
          <li key={post._id}>
            <h4>{post.content}</h4>
            <p>{post.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
