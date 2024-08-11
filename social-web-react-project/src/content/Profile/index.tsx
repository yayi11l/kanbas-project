import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../../shared/components/Header';
import PersonalInfo from './personalInfo';
import { useSelector } from "react-redux";
import * as client from "../../shared/client";
import '../Profile/profile.css';

export default function ProfilePage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { uid } = useParams<{ uid?: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Ensure currentUser and userData are available before rendering
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!userData) {
    return <p>User data not available.</p>;
  }

  const isCurrentUserProfile = !uid || (currentUser && uid === currentUser._id);

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <PersonalInfo userData={userData} currentUser={currentUser} />
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
