import { useEffect, useState } from 'react';
import { MdPhotoCameraFront } from 'react-icons/md';
import { IoSearchOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import * as client from '../Feed/client';
import NameCard from './NameCard';

export default function Widgets({ userId } : any) {
  const [following, setFollowing] = useState<any[]>([]);

  useEffect(() => {
    if (userId) {
      const fetchFollowing = async () => {
        try {
          const followings = await client.fetchFollowings(userId);
          setFollowing(followings);// Assuming response.data contains the list of followings
        } catch (error) {
          console.error('Error fetching following list:', error);
        }
      };
      fetchFollowing();
    }
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Followings</h2>
        <div className="flex space-x-2">
          <MdPhotoCameraFront className="text-xl h-6" />
          <IoSearchOutline className="text-xl h-6" />
          <BsThreeDots className="text-xl h-6" />
        </div>
      </div>
      {following.length > 0 ? (
        following.map((contact :any) => (
          <NameCard 
            key={contact._id} 
            src={contact.profilePicture} 
            name={contact.username} 
          />
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
}
