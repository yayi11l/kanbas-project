import React, { useState } from 'react';
import EditPersonalInfo from './EditPersonalInfo';
import "../Profile/profile.css";
import { IoLocationOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";

interface PersonalInfoProps {
  userData: any; 
  currentUser: any; 
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ userData, currentUser }) => {
  const [editableUserData, setEditableUserData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const isCurrentUser = userData?._id === currentUser?._id;

  const handleSave = (updatedUserData: any) => {
    setEditableUserData(updatedUserData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableUserData(userData);
    setIsEditing(false);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  if (!userData || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div id="web-social-personal-info">
      {isEditing ? (
        <EditPersonalInfo
          userData={editableUserData}
          onSave={handleSave}
          onCancel={handleCancel}
          onError={handleError}
        />
      ) : (
        <div>
          <div className="profile-container">
            <img src={userData.coverPhoto || ''} alt="Cover Photo" className="cover-photo" />
            <div className="profile-content">
              <img src={userData.profilePicture || ''} alt="Profile Photo" className="profile-photo" />
              <span className="profile-name">{userData.firstName || ''} {userData.lastName || ''}</span>
              {isCurrentUser && userData.email && (
                <p className="email">{userData.email}</p>
              )}
              <div className="location-container">
                <IoLocationOutline color='red' className="location-icon" />
                <span className="location-text">{userData.location || ''}</span>
              </div>
              <div className="location-container">
                <FaLink color='#1877f2' className="location-icon" />
                <a href={userData.website || '#'} className="location-text" target="_blank" rel="noopener noreferrer">
                  {userData.website || 'No website'}
                </a>
              </div>
              <p className="bio">{userData.bio || ''}</p>
            </div>
          </div>
          <br />
          <div className='button-container'>
            {isCurrentUser && (
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
