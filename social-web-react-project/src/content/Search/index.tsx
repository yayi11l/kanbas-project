import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as userClient from '../../shared/client';
import * as postClient from '../Home/Feed/client';
import axios from 'axios';
import NameCard from '../Home/Widgets/NameCard';
import './SearchResults.css';

export default function SearchResults() {
  const [userResults, setUserResults] = useState<any[]>([]);
  const [postResults, setPostResults] = useState<any[]>([]);
  const [googleResults, setGoogleResults] = useState<any[]>([]);
  const [noResults, setNoResults] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const name = new URLSearchParams(location.search).get('name');
  const content = new URLSearchParams(location.search).get('content');

  const handlePostClick = (postId: string) => {
    navigate(`/posts/detail/${postId}`);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (name) {
        const users = await userClient.findUsersByPartialName(name);
        setUserResults(users);
        setNoResults(users.length === 0);
      } else if (content) {
        const {source, data} = await postClient.fetchPostsByContent(content);
        console.log(source);
        if (source === "posts") {
          setPostResults(data);
        } else {
          setGoogleResults(data);
        }
      }
    };

    fetchResults();
  }, [name, content]);

  return (
    <div className="p-4 search-results-container">
      {name && (
        <>
          <h2 className="text-2xl mb-4">Search Results for "{name}"</h2>
          <div>
            <h3 className="text-xl mb-2">User Results:</h3>
            {userResults.length > 0 ? (
              userResults.map((user: any) => (
                <NameCard 
                key={user._id}
                name={user.username}
                userId={user._id}
                src={user.profilePicture}
                />
              ))
            ) : (
              <p className="no-results">No users found for "{name}".</p>
            )}
          </div>
        </>
      )}
      {content && (
        <>
          <h2 className="text-2xl mb-4">Search Results for "{content}"</h2>
          <div>
            <h3 className="text-xl mb-2">Post Results:</h3>
            {postResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {postResults.map((post: any) => (
                  <div
                  key={post._id}
                  className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg transition-shadow post-card"
                  onClick={() => handlePostClick(post._id)}
                >
                    <p className="text-lg font-semibold">{post.content.slice(0, 50)}...</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No posts found for "{content}".</p>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-xl mb-2">Google Results:</h3>
            {googleResults.length > 0 ? (
              googleResults.map((result: any) => (
                <div key={result.cacheId} className="p-2 border-b google-result">
                  <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    <p>{result.title}</p>
                  </a>
                  <p>{result.snippet}</p>
                </div>
              ))
            ) : (
              <p>No additional results found on Google.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}