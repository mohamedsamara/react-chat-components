import { useParams } from "react-router-dom";

import useStore from "lib/stores";
import { ChatFooter, ChatHeader, Msgs } from "./components";
import { EmptyChat } from "./components";

const Chat = () => {
  const { chatId } = useParams();
  const { getChatById } = useStore();
  const chat = getChatById(chatId ?? "");

  if (!chat || !chatId) return <EmptyChat />;

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <div className="flex-shrink-0">
        <ChatHeader chat={chat} />
      </div>
      <div className="flex flex-col-reverse flex-1 pt-20 pb-6 overflow-x-hidden overflow-y-auto no-scrollbar">
        <Msgs chat={chat} />
      </div>
      <ChatFooter chat={chat} />
    </div>
  );
};

export default Chat;
