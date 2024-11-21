import useStore from "lib/stores";
import ChatItem from "./ChatItem";

const ChatList = () => {
  const { chats } = useStore();

  return (
    <>
      {chats.length > 0 ? (
        <nav>
          <ul>
            {chats.map((chat) => (
              <li key={chat.id}>
                <ChatItem chat={chat} />
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <div className="flex h-full justify-center items-center">
          <p className="text-sm text-slate-600">
            Start a conversation or group chat
          </p>
        </div>
      )}
    </>
  );
};

export default ChatList;
