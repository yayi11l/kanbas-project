import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as client from "../../shared/client";
import { updateProfile } from './reducer';
import "../Profile/profile.css";

interface EditPersonalInfoProps {
  onCancel: () => void;
  onError: (error: string) => void;
  onSave: () => void; 
}

const EditPersonalInfo: React.FC<EditPersonalInfoProps> = ({ onCancel, onError,  onSave}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.profileReducer.profile);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const [editableUserData, setEditableUserData] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);

  const isAdmin = currentUser.role === "ADMIN";
  const isEditingOwnProfile = currentUser._id === profile._id;

  useEffect(() => {
    setEditableUserData(profile);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditableUserData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedData = await client.updateUser(profile._id, editableUserData);
      
      if (isEditingOwnProfile) {
        dispatch(updateProfile(updatedData));
      } 
      onSave();  // Call this to trigger a refetch in the parent component
      onCancel(); 
      

      setTimeout(() => {
        navigate(`/profile/${profile._id}`);
      }, 0);
    } catch (error) {
      onError("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="edit-personal-info">
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={editableUserData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={editableUserData.lastName}
          onChange={handleChange}
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
      {isAdmin && !isEditingOwnProfile && (
        <label>
          Role:
          <select
            name="role"
            value={editableUserData.role}
            onChange={handleChange}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="COMPANY">Admin</option>
          </select>
        </label>
      )}
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