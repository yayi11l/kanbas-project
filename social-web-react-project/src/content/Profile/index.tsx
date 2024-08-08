import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../shared/components/Header';
import PersonalInfo from './personalInfo'; 


interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    coverPhoto: string;
    bio: string;
    location: string;
    website: string;
    email: string;
    password: string; 
    followers: string[];
    following: string[];
    posts: string[];
    likes: string[];
    reviews: string[];
    comments: string[];
  }

const getLoggedInUser = async (): Promise<User | null> => {
  const response = await fetch('/api/users/me'); 
  if (response.ok) {
    return await response.json();
  }
  return null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`/api/users/${userId}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData: User = await userResponse.json();
        setUser(userData);

        const loggedInUserData = await getLoggedInUser();
        setLoggedInUser(loggedInUserData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="web-social-profile-page">
      <Header />
      <div className="profile-content">
        <div className="profile-header">
          <img src={user.coverPhoto} alt={`${user.firstName} ${user.lastName}`} className="cover-picture" />
          <img src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} className="profile-picture" />
          <h1>{user.firstName} {user.lastName}</h1>
          <p>@{user.username}</p>
        </div>
        <div className="profile-details">
          {loggedInUser && loggedInUser._id === user._id ? (
            <PersonalInfo user={user} />
          ) : (
            <div>
              <p>{user.bio}</p>
              <p>Location: {user.location}</p>
              <p>Website: <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
            </div>
          )}
        </div>
        <div className="profile-stats">
          <p>Followers: {user.followers.length}</p>
          <p>Following: {user.following.length}</p>
          <p>Posts: {user.posts.length}</p>
        </div>
        <Link to={`/users/${user._id}/followers`}>View Followers</Link>
        <Link to={`/users/${user._id}/following`}>View Following</Link>
        <Link to={`/users/${user._id}/reviews`}>View Reviews</Link>
      </div>
    </div>
  );
}
