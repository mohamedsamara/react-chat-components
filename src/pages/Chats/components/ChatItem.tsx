import { NavLink } from "react-router-dom";
import { format } from "date-fns";

import { Chat, LastMsg } from "lib/types";
import { useMsgText } from "lib/hooks";
import UserAvatar from "components/UserAvatar";
import ChatName from "./ChatName";

const ChatItem = ({ chat }: { chat: Chat }) => {
  const { lastMsg } = chat;
  const lastMsgSentAt = lastMsg ? format(lastMsg.createdAt, "p") : null;

  return (
    <NavLink
      to={`/chats/${chat.id}`}
      className={({ isActive }) =>
        [
          "py-2 px-3 m-2 block rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50",
          isActive ? "bg-muted hover:bg-muted" : "hover:bg-muted",
        ]
          .filter(Boolean)
          .join(" ")
      }
    >
      <div className="flex flex-row gap-2">
        <div className="flex justify-start basis-8 overflow-hidden">
          <UserAvatar src={chat.avatar} alias={chat.name} />
        </div>
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden pl-1 gap-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <ChatName name={chat.name} />
            </div>
            {chat.lastMsg && (
              <span className="text-xs text-slate-400">{lastMsgSentAt}</span>
            )}
          </div>
          {/* Last msg */}
          {lastMsg ? (
            <LastMsgContent lastMsg={lastMsg} />
          ) : (
            <p className="truncate capitalize text-xs leading-4 text-slate-500 max-w-[85%]">
              Start chatting!
            </p>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default ChatItem;

const LastMsgContent = ({ lastMsg }: { lastMsg: LastMsg }) => {
  const msgText = useMsgText(lastMsg);

  return (
    <div className="flex items-center justify-between w-full">
      <p className="truncate text-xs leading-4 text-slate-500 max-w-[85%]">
        {msgText}
      </p>
    </div>
  );
};
