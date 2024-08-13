import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Header from '../../shared/components/Header';
import PersonalInfo from './personalInfo';
import * as client from "../../shared/client";
import '../Profile/profile.css';

export default function ProfilePage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { uid } = useParams<{ uid?: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let userIdToFetch = currentUser?._id;

        if (uid) {
          userIdToFetch = uid;
        } else if (!currentUser) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const data = await client.findUserById(userIdToFetch);
        setUserData(data);

        // Check if the current user is following the profile user
        if (currentUser && uid && currentUser._id !== uid) {
          setIsFollowing(currentUser.following.includes(uid));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid, currentUser]);

  useEffect(() => {
    if (uid && currentUser && uid === currentUser._id) {
      navigate('/profile', { replace: true });
    }
  }, [uid, currentUser, navigate]);

  const handleFollowUnfollow = useCallback(async () => {
    if (!currentUser || !uid) {
      console.error("Cannot follow/unfollow: currentUser or uid is missing");
      return;
    }

    setIsUpdatingFollow(true);
    const previousFollowState = isFollowing;

    try {
      // Optimistic update
      setIsFollowing(!isFollowing);

      if (previousFollowState) {
        await client.unfollowUser(currentUser._id, uid);
      } else {
        await client.followUser(currentUser._id, uid);
      }

      // Update follower/following counts
      const updatedUserData = await client.findUserById(uid);
      setUserData(updatedUserData);
    } catch (error) {
      // Revert optimistic update if the action failed
      setIsFollowing(previousFollowState);
      console.error("Error following/unfollowing user:", error);
      // Show error message to user
      setError(error instanceof Error ? error.message : "Failed to update follow status");
    } finally {
      setIsUpdatingFollow(false);
    }
  }, [currentUser, uid, isFollowing]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>User data not available.</p>;

  const isCurrentUserProfile = !uid || (currentUser && uid === currentUser._id);

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <PersonalInfo userData={userData} currentUser={currentUser} />
        <div className='button-container'>
          {!isCurrentUserProfile && currentUser && (
            <button onClick={handleFollowUnfollow} className="edit-button"  disabled={isUpdatingFollow}>
               {isUpdatingFollow ? 'Updating...' : isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
          </div>
        <div className="profile-links-container">
          <div className="profile-links">
            <Link to={`/profile/${userData._id}/following`}>
              Following: <span>{userData.following.length}</span>
            </Link>
            <Link to={`/profile/${userData._id}/followers`}>
              Followers: <span>{userData.followers.length}</span>
            </Link>
            <Link to={`/profile/${userData._id}/reviews`}>
              Reviews: <span>{userData.reviews.length}</span>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}