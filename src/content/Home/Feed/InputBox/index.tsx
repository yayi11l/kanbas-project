import { FaPhotoFilm, FaRegFaceGrin } from "react-icons/fa6";
import { FaUserTag } from "react-icons/fa";
import { useRef, useState } from "react";

export default function InputBox() {
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [imageToPost, setImageToPost] = useState<string | ArrayBuffer | null>(null);

  const sendPost = (e: any) => {
    e.preventDefault();
    // Handle the post submission here
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageToPost(reader.result);
      };
    }
  };

  const removeImg = () => {
    setImageToPost(null);
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
