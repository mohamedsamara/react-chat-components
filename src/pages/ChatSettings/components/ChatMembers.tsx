import useStore from "lib/stores";
import { Chat } from "lib/types";
import MemberItem from "./MemberItem";
import AddMembers from "./AddMembers";

type Props = {
  chat: Chat;
  canEdit: boolean;
};

const ChatMembers = ({ chat, canEdit }: Props) => {
  const { getChatMembers } = useStore();
  const members = getChatMembers(chat.id);

  return (
    <>
      {canEdit && (
        <div className="text-right">
          <AddMembers chat={chat} members={members} />
        </div>
      )}
      <div className="max-h-[calc(100vh-300px)] overflow-x-hidden overflow-y-auto no-scrollbar">
        {members.map((member) => (
          <MemberItem
            key={member.id}
            member={member}
            canEdit={canEdit}
            chat={chat}
          />
        ))}
      </div>
    </>
  );
};

export default ChatMembers;
