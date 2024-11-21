import { Outlet } from "react-router-dom";

import ChatHeader from "./ChatsHeader";
import ChatList from "./ChatList";

const ChatLayout = () => {
  return (
    <main className="flex flex-col h-full overflow-hidden lg:flex-row">
      <aside className="hidden lg:block min-w-[310px] lg:max-w-[330px] border-r border-r-gray-100">
        <ChatHeader />
        <div className="overflow-y-auto no-scrollbar h-[calc(100vh_-3.5rem)]">
          <ChatList />
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <div className={"flex-1 h-full w-full bg-white"}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default ChatLayout;
