import React, { useState } from 'react';
import * as client from "../../shared/client";
import "../Profile/profile.css";
import { useDispatch, useSelector } from 'react-redux';
import { setProfile, updateProfile } from './reducer';

interface EditPersonalInfoProps {
  onSave: (updatedUserData: any) => void;
  onCancel: () => void;
  onError: (error: string) => void;
}

const EditPersonalInfo: React.FC<EditPersonalInfoProps> = () => {
  const profile = useSelector((state: any) => state.profileReducer.profile);
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!profile.firstName) newErrors.firstName = 'First name is required';
    if (!profile.lastName) newErrors.lastName = 'Last name is required';
    if (!profile.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateProfile({ [name]: value }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const updatedData = await client.updateUser(profile?._id, profile);
      dispatch(setProfile(updatedData));
      // onSave(updatedData);
    } catch (error) {
      // onError("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) return null;

  return (
    <div className="edit-personal-info">
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={profile.firstName || ''}
          onChange={handleChange}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={profile.lastName || ''}
          onChange={handleChange}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={profile.email || ''}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={profile.location || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Bio:
        <textarea
          name="bio"
          value={profile.bio || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Website:
        <input
          type="text"
          name="website"
          value={profile.website || ''}
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
