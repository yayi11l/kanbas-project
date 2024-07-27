import { MdPhotoCameraFront } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Contact from "./Contact";

const contacts = [
  { src: "/Images/3665917.png", name: "Ryan Berg" },
  { src: "/Images/3665917.png", name: "Jane Doe" },
  { src: "/Images/3665917.png", name: "John Smith" },
  { src: "/Images/3665917.png", name: "Alice Johnson" },
  { src: "/Images/3665917.png", name: "Bob Brown" },
  { src: "/Images/3665917.png", name: "Charlie Davis" },
  { src: "/Images/3665917.png", name: "Diana Evans" },
  { src: "/Images/3665917.png", name: "Eve Foster" },
  { src: "/Images/3665917.png", name: "Frank Green" },
  { src: "/Images/3665917.png", name: "Grace Hill" }
]

export default function Widgets() {
  return (
    <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Contacts</h2>
        <div className="flex space-x-2">
          <MdPhotoCameraFront className="text-xl h-6" />
          <IoSearchOutline className="text-xl h-6" />
          <BsThreeDots className="text-xl h-6" />
        </div>
      </div>
      {contacts.map(contact => (
        <Contact src={contact.src} name={contact.name} />
      ))

      }
    </div>
  )
}