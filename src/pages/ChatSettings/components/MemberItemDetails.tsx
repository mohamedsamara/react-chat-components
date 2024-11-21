import useStore from "lib/stores";
import { ChatMember } from "lib/types";
import UserAvatar from "components/UserAvatar";

type Props = {
  member: ChatMember;
};

const MemberItemDetails = ({ member }: Props) => {
  const { profile } = useStore();
  const isMe = profile.id === member.id;

  return (
    <div className="flex items-center gap-2">
      <div className="flex justify-start overflow-hidden">
        <UserAvatar src={member.avatar} alias={member.name} />
      </div>
      <div className="flex items-center justify-start flex-1 gap-1">
        <span className="text-md">{member.name}</span>{" "}
        {isMe && <span className="text-sm text-slate-500">You</span>}
      </div>
    </div>
  );
};

export default MemberItemDetails;
