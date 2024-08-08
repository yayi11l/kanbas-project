import { FaPhotoFilm, FaRegFaceGrin } from "react-icons/fa6";
import { FaUserTag } from "react-icons/fa";
import { useRef, useState } from "react";
import * as client from "../client";
import { useSelector } from "react-redux";

export default function InputBox({ onNewPost }: { onNewPost: () => void }) {
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [imageToPost, setImageToPost] = useState<string | ArrayBuffer | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [postContent, setPostContent] = useState<string>("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const sendPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      try {
        // Create FormData object to handle multipart form data
        const formData = new FormData();
        formData.append('user', currentUser._id);
        formData.append('content', postContent);
        if (imageFile) {
          formData.append('images', imageFile); // For single file upload
        }

        // Send the FormData to the server
        await client.createPost(formData);

        // Clear input fields
        setPostContent("");
        setImageToPost(null);
        setImageFile(null);

        // Notify parent component about the new post
        onNewPost();
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageToPost(reader.result);
        setImageFile(file);
      };
    }
  };

  const removeImg = () => {
    setImageToPost(null);
    setImageFile(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <img 
          className="rounded-full"
          src="/Images/3665917.png" 
          width={40}
          height={40}
          alt="User Avatar" 
        />
        <form onSubmit={sendPost} className="flex flex-1">
          <input 
            type="text"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            placeholder="What's on your mind?"
          />
          <button hidden type="submit">Submit</button>
          {imageToPost && 
            <div onClick={removeImg} className="flex flex-col filter hover:brightness-100 transition duration-150 transform hover:scale-105 cursor-pointer">
              <img className="h-10 object-contain" src={imageToPost as string} alt="Preview" />
              <p className="text-xs text-red-500 text-center">Remove</p>
            </div>
          }
        </form>
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div 
          onClick={() => filePickerRef.current?.click()}
          className="inputIcon cursor-pointer"
        >
          <FaPhotoFilm className="h-7 text-green-500 text-2xl" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input 
            ref={filePickerRef} 
            onChange={addImageToPost} 
            type="file" 
            hidden 
            accept="image/*,video/*" 
          />
        </div>
        <div className="inputIcon cursor-pointer">
          <FaUserTag className="h-7 text-blue-500 text-2xl" />
          <p className="text-xs sm:text-sm xl:text-base">Tag Friends</p>
        </div>
        <div className="inputIcon cursor-pointer">
          <FaRegFaceGrin className="h-7 text-yellow-500 text-2xl" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}
