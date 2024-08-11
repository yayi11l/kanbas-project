import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as client from '../../../Home/Feed/client';
import '../../../Profile/profile.css';
import { Link } from 'react-router-dom';

interface Follower {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}


const Followers: React.FC= () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await client.fetchFollowers(userId);
        setFollowers(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
    fetchFollowers();}
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="web-social-followers" className="web-social-followers">
      <h3>Followers</h3>
      <ul>
        {followers.map(follower => (
          <li key={follower._id}>
            <Link to={`/profile/${follower._id}`} className="follower-link">
            <img src={follower.profilePicture} alt={`${follower.firstName} ${follower.lastName}`} className="follower-picture" />
            <p>{follower.firstName} {follower.lastName}</p>
            <p>@{follower.username}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;
