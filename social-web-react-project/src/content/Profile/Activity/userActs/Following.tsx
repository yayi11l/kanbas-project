import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as client from '../../../Home/Feed/client';
import '../../../Profile/profile.css';
import { Link } from 'react-router-dom';

interface Following {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}


const Following: React.FC = () => {
  const [following, setFollowing] = useState<Following[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const data = await client.fetchFollowings(userId);
        setFollowing(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFollowing();
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="web-social-following" className="web-social-followers">
      <h3>Following</h3>
      <ul>
        {following.map(f => (
          <li key={f._id}>
             <Link to={`/profile/${f._id}`} className="follower-link">
            <img src={f.profilePicture} alt={`${f.firstName} ${f.lastName}`} className="follower-picture" />
            <p>{f.firstName} {f.lastName}</p>
            <p>@{f.username}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Following;
