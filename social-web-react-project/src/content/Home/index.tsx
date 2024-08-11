import Header from "../../shared/components/Header";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import { useSelector } from 'react-redux';

export default function Home() {
  const currentUser = useSelector((state : any) => state.accountReducer.currentUser);

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <Feed />
        {currentUser && <Widgets userId={currentUser._id} />}
      </div>
    </div>
  );
}
