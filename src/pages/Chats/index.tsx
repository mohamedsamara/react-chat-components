import { ChatList, ChatsHeader, EmptyChats } from "./components";

const Chats = () => {
  return (
    <>
      <div className="block lg:hidden">
        <ChatsHeader />
        <div className="overflow-y-auto no-scrollbar h-[calc(100vh_-3.5rem)]">
          <ChatList />
        </div>
      </div>
      <div className="flex-1 hidden w-full h-full lg:block">
        <EmptyChats />
      </div>
    </>
  );
};

export default Chats;
