import Header from "../../../shared/components/Header";
import Feed from "../../components/Feed";
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";

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