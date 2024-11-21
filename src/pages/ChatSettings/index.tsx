import { useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import useStore from "lib/stores";
import { ChatSettingsHeader, ChatTabs } from "./components";
import { Link } from "components/Links";
import { EmptyChat } from "../Chat/components";

const ChatSettings = () => {
  const { chatId } = useParams();
  const { profile, getChatById } = useStore();
  const chat = getChatById(chatId ?? "");

  if (!chat || !chatId) return <EmptyChat />;

  if (!chat || !chatId) return <EmptyChat />;

  const isGroupChat = chat.type === "GROUP";
  const isOwner = chat.ownerId === profile.id;
  const canEdit = isOwner && isGroupChat;

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between h-12 px-3 border-b border-b-slate-100">
        <Link className="flex items-center gap-1" to={`/chats/${chat.id}`}>
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>
      <div className="flex flex-col flex-1 w-full max-w-md gap-10 px-6 py-12 mx-auto overflow-hidden">
        <ChatSettingsHeader chat={chat} canEdit={canEdit} />
        <ChatTabs chat={chat} canEdit={canEdit} />
      </div>
    </div>
  );
};

export default ChatSettings;
