import StoryCard from "../StoryCard"

const stories = [
  {
    name:"Mark Zackerberg",
    src: "/Images/3665917.png",
    profile: "/Images/3665917.png",
  },
]

export default function Stories() {
  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {
        stories.map((story) => (
          <StoryCard  name={story.name}
          src={story.src} profile={story.profile}
          />
        ))
      }
      
    </div>
  )
}