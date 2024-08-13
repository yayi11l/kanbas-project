import React from 'react';
import Post from '../../../Home/Feed/Posts/Post'; // Adjust the import path as needed

interface ReviewedPostsProps {
  posts: any[];
}

const ReviewedPosts: React.FC<ReviewedPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return <div className="text-center py-10">No reviewed posts available.</div>;

  return (
    <div className="space-y-4">
      {posts.map((post: any) => {
        if (!post || !post._id) {
          console.error('Invalid post object:', post);
          return null; // Skip rendering this post
        }
        return <Post key={post._id} pid={post._id} />;
      })}
    </div>
  );
};

export default ReviewedPosts;