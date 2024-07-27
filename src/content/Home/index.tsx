import Header from "../../shared/components/Header";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";

export default function Home() {
  return (
    <div>

      <Header />
      <div className="flex">
        <Sidebar/>
        <Feed/>
        <Widgets/>
      </div>

      
    </div>
  )
}