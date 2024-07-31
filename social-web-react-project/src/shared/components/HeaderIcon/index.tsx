export default function HeaderIcon({Icon, active} : any) {
  return (
    <div className="flex items-center cursor-pointer px-2 sm:px-8 md:px-14 sm:h-14
      md:hover:bg-gray-100 rounded-xl active:border-b-2 
      active:border-blue-500 group">
        <Icon className={`text-lg text-gray-500 text-center mx-auto group-hover:text-blue-500
        ${active && "text-blue-500"}`}/>
    </div>
  )
}