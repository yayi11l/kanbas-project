import React, { useState, useEffect } from 'react';
import * as client from "../../shared/client";
import "../Profile/profile.css";

interface EditPersonalInfoProps {
  userData: any;
  onSave: (updatedUserData: any) => void;
  onCancel: () => void;
  onError: (error: string) => void;
}

const EditPersonalInfo: React.FC<EditPersonalInfoProps> = ({ userData, onSave, onCancel, onError }) => {
  const [editableUserData, setEditableUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    bio: '',
    website: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  // Update editableUserData when userData changes
  useEffect(() => {
    if (userData) {
      setEditableUserData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        location: userData.location || '',
        bio: userData.bio || '',
        website: userData.website || ''
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableUserData({
      ...editableUserData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedData = await client.updateUser(userData._id, editableUserData);
      onSave(updatedData); 
    } catch (error) {
      onError("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="edit-personal-info">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={`${editableUserData.firstName} ${editableUserData.lastName}`}
          onChange={(e) => {
            const [firstName, lastName] = e.target.value.split(' ');
            setEditableUserData({
              ...editableUserData,
              firstName,
              lastName
            });
          }}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={editableUserData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={editableUserData.location}
          onChange={handleChange}
        />
      </label>
      <label>
        Bio:
        <textarea
          name="bio"
          value={editableUserData.bio}
          onChange={handleChange}
        />
      </label>
      <label>
        Website:
        <input
          type="text"
          name="website"
          value={editableUserData.website}
          onChange={handleChange}
        />
      </label>
      <div className="button-container">
        <button
          className="edit-button"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button
          className="cancel-button"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPersonalInfo;
