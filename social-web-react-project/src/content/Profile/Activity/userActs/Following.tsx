import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Following {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface FollowingProps {
  userId: string;
}

const Following: React.FC = () => {
  const [following, setFollowing] = useState<Following[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/following`);
        if (!response.ok) {
          throw new Error('Failed to fetch following');
        }
        const data: Following[] = await response.json();
        setFollowing(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="web-social-followers">
      <h3>Followers</h3>
      <ul>
        {following.map(f => (
          <li key={f._id}>
            <img src={f.profilePicture} alt={`${f.firstName} ${f.lastName}`} className="following-picture" />
            <p>{f.firstName} {f.lastName}</p>
            <p>@{f.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Following;
