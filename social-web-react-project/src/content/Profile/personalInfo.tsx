import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditPersonalInfo from './EditPersonalInfo';
import "../Profile/profile.css";
import { IoLocationOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";

interface PersonalInfoProps {
  currentUser: any;
  onSave: () => void; 
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ currentUser, onSave }) => {
  const profile = useSelector((state: any) => state.profileReducer.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const isCurrentUser = profile?._id === currentUser?._id;
  const isAnonymous = currentUser === null;

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div id="web-social-personal-info">
      {isEditing ? (
        <EditPersonalInfo
          onCancel={handleCancel}
          onError={handleError}
          onSave={onSave} 
        />
      ) : (
        <div>
          <div className="profile-container">
            <img src={profile.coverPhoto || ''} alt="Cover Photo" className="cover-photo" />
            <div className="profile-content">
              <img src={profile.profilePicture || ''} alt="Profile Photo" className="profile-photo" />
              <span className="profile-name">{profile.firstName || ''} {profile.lastName || ''}</span>
              {!isAnonymous && (isCurrentUser || currentUser.role === "ADMIN") && profile.email && (
                <p className="email">{profile.email}</p>
              )}
              <div className="location-container">
                <IoLocationOutline color='red' className="location-icon" />
                <span className="location-text">{profile.location || ''}</span>
              </div>
              <div className="location-container">
                <FaLink color='#1877f2' className="location-icon" />
                <a href={profile.website || '#'} className="location-text" target="_blank" rel="noopener noreferrer">
                  {profile.website || 'No website'}
                </a>
              </div>
              <p className="bio">{profile.bio || ''}</p>
              <p className="bio">Role: {profile.role || ''}</p>
            </div>
          </div>
          <br />
          <div className='button-container'>
            {!isAnonymous && (isCurrentUser || currentUser.role === "ADMIN") && (
              <button onClick={() => setIsEditing(true)} className="edit-button">
                Edit
              </button>
            )}
          </div>
          {isAnonymous && (
            <p className="anonymous-message">Sign in to see more details or interact with this profile.</p>
          )}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PersonalInfo;