import React, { useState } from 'react';

interface User {
  _id: string;
  username: string;
}

// Define an interface for the Comment props
interface CommentProps {
  user: User;
  content: string;
  createdAt: string;
  onReply: (content: string) => void;
  onDelete: () => void;
}

export default function Comment({ user, content, createdAt, onReply, onDelete }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    if (replyContent.trim().length > 0 && replyContent.length <= 1000) {
      onReply(replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  return (
    <div id="web-social-comment" className="comment">
      <div className="comment-header">
        <span className="comment-author">{user.username}</span>
        <span className="comment-timestamp">{new Date(createdAt).toLocaleString()}</span>
      </div>
      <p className="comment-content">{content}</p>
      <div className="comment-actions">
        <button onClick={() => setIsReplying(!isReplying)}>
          {isReplying ? 'Cancel Reply' : 'Reply'}
        </button>
        <button onClick={onDelete}>Delete</button>
      </div>
      {isReplying && (
        <div className="reply-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply... (max 1000 characters)"
            maxLength={1000}
          />
          <button onClick={handleReply} disabled={replyContent.trim().length === 0}>
            Submit Reply
          </button>
        </div>
      )}
    </div>
  );
}