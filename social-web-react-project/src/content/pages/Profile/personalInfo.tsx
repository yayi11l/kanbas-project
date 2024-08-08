import React, { useState } from 'react';

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  coverPhoto: string;
  bio: string;
  location: string;
  website: string;
  email: string;
  password: string; 
  followers: string[];
  following: string[];
  posts: string[];
  likes: string[];
  reviews: string[];
  comments: string[];
}

interface PersonalInfoProps {
  user: User;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
  const [editableUser, setEditableUser] = useState<User>(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditableUser({
      ...editableUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      
      alert('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="personal-info">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="firstName"
            value={editableUser.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={editableUser.lastName}
            onChange={handleChange}
          />
          <textarea
            name="bio"
            value={editableUser.bio}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            value={editableUser.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="website"
            value={editableUser.website}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={editableUser.email}
            onChange={handleChange}
            readOnly 
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Website:</strong> <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}
