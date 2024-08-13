import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as client from '../../../Home/Feed/client';

interface Post {
  _id: string;
  content: string;
  createdAt: string;
}

const Reviews: React.FC = () => {
  const [reviewedPosts, setReviewedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchReviewedPosts = async () => {
      try {
        console.log('Fetching reviews for userId:', userId);
        const data = await client.fetchReviews(userId);
        setReviewedPosts(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
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
      {reviewedPosts.length > 0 ? (
        <ul>
          {reviewedPosts.map((post) => (
            <li key={post._id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h4>{post.content}</h4>
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default Reviews;