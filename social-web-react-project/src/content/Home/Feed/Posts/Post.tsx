import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa6";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaRegShareSquare } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { likePost, unlikePost, addComment, removeComment, sharePost } from "../client";

export default function Post({ pid, user, content, images, likes, comments, shareCount, createdAt, updatedAt }: any) {
  const [likeList, setLikeList] = useState(likes);
  const [commentList, setCommentList] = useState(comments);
  const [shares, setShares] = useState(shareCount);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();

  const isLiked = currentUser && likeList ? likeList.some((like: any) => like._id === currentUser._id) : false;

  const handleLike = async () => {
    if (!currentUser) return;
    try {
      if (isLiked) {
        await unlikePost(pid, currentUser._id);
        setLikeList(likeList.filter((like: any) => like._id !== currentUser._id));
      } else {
        await likePost(pid, currentUser._id);
        setLikeList([...likeList, currentUser]);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleComment = async () => {
    if (!currentUser) return;
    const commentText = prompt("Enter your comment:");
    if (commentText) {
      const comment = { user: currentUser, content: commentText };
      try {
        await addComment(pid, comment);
        setCommentList([...commentList, comment]);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleRemoveComment = async (commentId: any) => {
    if (!currentUser) return;
    try {
      await removeComment(pid, commentId);
      setCommentList(commentList.filter((comment: any) => comment._id !== commentId));
    } catch (error) {
      console.error("Error removing comment:", error);
    }
  };

  const handleShare = async () => {
    if (!currentUser) return;
    try {
      await sharePost(pid);
      setShares(shares + 1);
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const goToPostDetails = () => {
    // history.push(`/posts/${pid}`);
    navigate(`/posts/detail/${pid}`);
  };

  return (
    <div className="flex flex-col" onClick={goToPostDetails}>
      <div className="p-5 bg-white mt-5 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          {user && (
            <>
              <img
                className="rounded-full"
                src={user.profilePicture}
                width={40}
                height={40}
                alt={user.username}
              />
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-xs text-gray-400">{new Date(createdAt).toLocaleString()}</p>
              </div>
            </>
          )}
        </div>
        <p className="pt-4">{content}</p>
      </div>
      {images && images.length > 0 && (
        <div className="relative h-56 md:h-86 bg-white">
          {images.map((img: any, index: any) => (
            <img key={index} src={img} alt="Post Image" />
          ))}
        </div>
      )}

      {/* footer */}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
        {currentUser && (
          <>
            <div className="inputIcon rounded-none rounded-bl-2xl" onClick={handleLike}>
              {isLiked ? (
                <>
                  <FaThumbsUp className="h-4 text-blue-500" />
                  <p className="text-xs sm:text-base text-blue-500">Liked</p>
                </>
              ) : (
                <>
                  <FaRegThumbsUp className="h-4" />
                  <p className="text-xs sm:text-base">Like</p>
                </>
              )}
            </div>
            <div className="inputIcon rounded-none" onClick={handleComment}>
              <IoChatboxEllipsesOutline className="h-4" />
              <p className="text-xs sm:text-base">Comment</p>
            </div>
            <div className="inputIcon rounded-none rounded-br-2xl" onClick={handleShare}>
              <FaRegShareSquare className="h-4" />
              <p className="text-xs sm:text-base">Share</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
