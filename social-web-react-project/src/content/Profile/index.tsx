import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Header from '../../shared/components/Header';
import PersonalInfo from './personalInfo';
import * as client from "../../shared/client";
import '../Profile/profile.css';
import { setProfile, updateProfile } from './reducer';

export default function ProfilePage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const profile = useSelector((state: any) => state.profileReducer.profile);
  const { uid } = useParams<{ uid?: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        dispatch(setProfile(data));

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
  }, [uid, currentUser, dispatch]);

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
      dispatch(updateProfile(updatedUserData)); // Use updateProfile to update only necessary parts
    } catch (error) {
      // Revert optimistic update if the action failed
      setIsFollowing(previousFollowState);
      console.error("Error following/unfollowing user:", error);
      setError(error instanceof Error ? error.message : "Failed to update follow status");
    } finally {
      setIsUpdatingFollow(false);
    }
  }, [currentUser, uid, isFollowing, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return <p>User data not available.</p>;

  const isCurrentUserProfile = !uid || (currentUser && uid === currentUser._id);

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <PersonalInfo currentUser={currentUser} />
        <div className='button-container'>
          {!isCurrentUserProfile && currentUser && (
            <button onClick={handleFollowUnfollow} className="edit-button" disabled={isUpdatingFollow}>
              {isUpdatingFollow ? 'Updating...' : isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="profile-links-container">
          <div className="profile-links">
            <Link to={`/profile/${profile._id}/following`}>
              Following: <span>{profile.following?.length || 0}</span>
            </Link>
            <Link to={`/profile/${profile._id}/followers`}>
              Followers: <span>{profile.followers?.length || 0}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
