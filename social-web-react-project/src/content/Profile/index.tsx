import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Header from '../../shared/components/Header';
import PersonalInfo from './personalInfo';
import * as client from "../../shared/client";
import { setProfile } from './reducer';
import '../Profile/profile.css';

// Define the User interface
interface User {
  _id: string;
  following: string[];
  followers: string[];
  // Add other user properties as needed
}

export default function ProfilePage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const profile = useSelector((state: any) => state.profileReducer.profile);
  const dispatch = useDispatch();
  const { uid } = useParams<{ uid?: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchUserData = useCallback(async () => {
    try {
      let userIdToFetch = uid || currentUser?._id;

      if (!userIdToFetch) {
        setError("No user ID available.");
        setLoading(false);
        return;
      }

      const data: User = await client.findUserById(userIdToFetch);
      dispatch(setProfile(data));
      setUserData(data);

      // Check if the current user is following the profile user
      if (currentUser && uid && currentUser._id !== uid) {
        const isCurrentlyFollowing = currentUser.following.includes(uid);
        console.log("Is currently following:", isCurrentlyFollowing);
        setIsFollowing(isCurrentlyFollowing);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  }, [uid, currentUser, dispatch]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

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
      const updatedUserData: User = await client.findUserById(uid);
      setUserData(updatedUserData);
      dispatch(setProfile(updatedUserData));
    } catch (error) {
      // Revert optimistic update if the action failed
      setIsFollowing(previousFollowState);
      console.error("Error following/unfollowing user:", error);
      // Show error message to user
      setError(error instanceof Error ? error.message : "Failed to update follow status");
    } finally {
      setIsUpdatingFollow(false);
    }
  }, [currentUser, uid, isFollowing, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>User data not available.</p>;

  const isCurrentUserProfile = !uid || (currentUser && uid === currentUser._id);

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <PersonalInfo currentUser={currentUser} onSave={handleRefresh}/>
        <div className='button-container'>
          {!isCurrentUserProfile && currentUser && (
            <button 
              onClick={handleFollowUnfollow} 
              className="edit-button" 
              disabled={isUpdatingFollow}
            >
              {isUpdatingFollow ? 'Updating...' : isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="profile-links-container">
          <div className="profile-links">
            <Link to={`/profile/${userData._id}/following`}>
              Following: <span>{userData.following?.length || 0}</span>
            </Link>
            <Link to={`/profile/${userData._id}/followers`}>
              Followers: <span>{userData.followers?.length || 0}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}