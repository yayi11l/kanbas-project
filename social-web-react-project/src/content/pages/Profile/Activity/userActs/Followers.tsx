import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Follower {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface FollowersProps {
  userId: string;
}

const Followers: React.FC= () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/followers`);
        if (!response.ok) {
          throw new Error('Failed to fetch followers');
        }
        const data: Follower[] = await response.json();
        setFollowers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="web-social-followers">
      <h3>Followers</h3>
      <ul>
        {followers.map(follower => (
          <li key={follower._id}>
            <img src={follower.profilePicture} alt={`${follower.firstName} ${follower.lastName}`} className="follower-picture" />
            <p>{follower.firstName} {follower.lastName}</p>
            <p>@{follower.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;
