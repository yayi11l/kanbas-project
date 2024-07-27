export default function StoryCard({ name, src, profile}: any) {
  return (
    <div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x-auto p-3
    transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
      <img 
      className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10"
      src={profile} 
      width={40}
      height={40}
      alt="" 
      />

      <img 
      className="object-cover filter brightness-75 rounded-full lg:rounded-3xl"
      src={src}
      alt="" 
      />
    </div>
  )
}