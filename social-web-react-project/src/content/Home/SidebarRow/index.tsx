export default function SidebarRow({src, Icon, title} : any) {
  return (
    <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
      {src && (
        <img
          className="rounded-full"
          src={src}
          width={30}
          height={30}
        />
      )}
      {Icon && (
        <Icon className="h-8 w-8 text-blue-500" />
      )}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  )
}