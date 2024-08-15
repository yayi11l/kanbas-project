import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegThumbsUp, FaThumbsUp, FaRegShareSquare } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import {
  fetchPostById,
  likePost,
  unlikePost,
  addComment,
  removeComment,
  sharePost,
} from "../client";

const PostDetails = () => {
  const { pid } = useParams<{ pid: string }>();
  const [post, setPost] = useState<any>(null); // Adjust the type according to your data structure
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const handleProfileClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPost = await fetchPostById(pid);
        setPost(fetchedPost);
      } catch (error) {
        setError("Error fetching post details");
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pid]);

  const handleLike = async () => {
    if (!currentUser) return;
    try {
      const url = post.isLiked ? `/api/posts/${pid}/unlike` : `/api/posts/${pid}/like`;
      await (post.isLiked ? unlikePost(pid, currentUser._id) : likePost(pid, currentUser._id));
      setPost((prevPost : any) => ({
        ...prevPost,
        isLiked: !prevPost.isLiked,
        likes: prevPost.isLiked 
          ? prevPost.likes.filter((like: any) => like._id !== currentUser._id) 
          : [...prevPost.likes, currentUser],
      }));
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleComment = async () => {
    if (!currentUser || !newComment.trim()) return;
    try {
      const comment = { user: currentUser, content: newComment };
      await addComment(pid, comment);
      setPost((prevPost : any) => ({
        ...prevPost,
        comments: [...prevPost.comments, comment],
      }));
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleRemoveComment = async (commentId: string) => {
    if (!currentUser) return;
    try {
      await removeComment(pid, commentId);
      setPost((prevPost : any) => ({
        ...prevPost,
        comments: prevPost.comments.filter((comment: any) => comment._id !== commentId),
      }));
    } catch (error) {
      console.error("Error removing comment:", error);
    }
  };

  const handleShare = async () => {
    if (!currentUser) return;
    try {
      await sharePost(pid);
      setPost((prevPost : any) => ({
        ...prevPost,
        shareCount: prevPost.shareCount + 1,
      }));
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!post) return <div className="text-center py-10">Post not found</div>;

  return (
    <div className="flex flex-col max-w-2xl mx-auto">
      <div className="p-5 bg-white mt-5 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          {post.user && (
            <>
              <img
                className="rounded-full"
                src={post.user.profilePicture}
                width={40}
                height={40}
                alt={post.user.username}
                onClick={() => handleProfileClick(post.user._id)}
                
              />
              <div>
                <p className="font-medium text-lg">{post.user.username}</p>
                <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </>
          )}
        </div>
        <p className="pt-4 text-base">{post.content}</p>
      </div>
      {post.images && post.images.length > 0 && (
        <div className="relative bg-white">
        {post.images.map((image: any) => (
          <img
            key={image._id}
            src={`${process.env.REACT_APP_REMOTE_SERVER}/uploads/${image.filename}`}
            alt={image.filename}
          className="object-cover w-full h-full" />
        ))}
        </div>
      )}

      {/* footer */}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t mt-5">
        {currentUser && (
          <>
            <div className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-bl-2xl" onClick={handleLike}>
              {post.isLiked ? (
                <>
                  <FaThumbsUp className="h-5 text-blue-500" />
                  <p className="text-xs sm:text-base text-blue-500">Liked</p>
                </>
              ) : (
                <>
                  <FaRegThumbsUp className="h-5" />
                  <p className="text-xs sm:text-base">Like</p>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleComment}>
              <IoChatboxEllipsesOutline className="h-5" />
              <p className="text-xs sm:text-base">Comment</p>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-br-2xl" onClick={handleShare}>
              <FaRegShareSquare className="h-5" />
              <p className="text-xs sm:text-base">Share</p>
            </div>
          </>
        )}
      </div>

      {/* Comments Section */}
      <div className="p-5 bg-white mt-5 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        {post.comments.length > 0 ? (
          post.comments.map((comment: any) => (
            <div key={comment._id} className="flex items-start space-x-2 mb-4">
              <img
                className="rounded-full"
                src={comment.user.profilePicture}
                width={30}
                height={30}
                alt={comment.user.username}
              />
              <div className="flex-1">
                <p className="font-medium">{comment.user.username}</p>
                <p className="text-sm">{comment.content}</p>
                {currentUser && currentUser._id === comment.user._id && (
                  <button
                    className="text-xs text-red-500 mt-1 hover:underline"
                    onClick={() => handleRemoveComment(comment._id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
        {currentUser && (
          <div className="mt-5">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleComment}
            >
              Post Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
