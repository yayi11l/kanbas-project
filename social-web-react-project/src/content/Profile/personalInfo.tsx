import React, { useState } from 'react';
import EditPersonalInfo from './EditPersonalInfo';
import "../Profile/profile.css";
import { IoLocationOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { useSelector } from 'react-redux';


interface PersonalInfoProps {
  currentUser: any;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ currentUser }) => {
  const profile = useSelector((state: any) => state.profileReducer.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const isCurrentUser = profile?._id === currentUser?._id;

  // const handleSave = (updatedUserData: any) => {
  //   setIsEditing(false);
  // };

  // const handleCancel = () => {
  //   setIsEditing(false);
  // };

  // const handleError = (error: string) => {
  //   setError(error);
  // };

  if (!profile || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div id="web-social-personal-info">
      {isEditing ? (
        <EditPersonalInfo
        
        />
      ) : (
        <div>
          <div className="profile-container">
            <img src={profile.coverPhoto || ''} alt="Cover Photo" className="cover-photo" />
            <div className="profile-content">
              <img src={profile.profilePicture || ''} alt="Profile Photo" className="profile-photo" />
              <span className="profile-name">{profile.firstName || ''} {profile.lastName || ''}</span>
              {(isCurrentUser || currentUser.role === "ADMIN") && profile.email && (
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
            {(isCurrentUser || currentUser.role === "ADMIN" ) && (
              <button onClick={() => setIsEditing(true)} className="edit-button">
                Edit
              </button>
            )}
          </div>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PersonalInfo;