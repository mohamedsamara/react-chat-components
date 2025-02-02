import { useState } from "react";
import { UserMinus } from "lucide-react";

import { Chat, ChatMember } from "lib/types";
import useStore from "lib/stores";
import { Button } from "components/ui/button";
import MemberItemDetails from "./MemberItemDetails";
import Loader from "components/Loader";

type Props = {
  member: ChatMember;
  canEdit: boolean;
  chat: Chat;
};

const MemberItem = ({ member, canEdit, chat }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile, removeMember } = useStore();
  const isMe = member.id === profile.id;
  const isOwner = chat.ownerId === member.id;

  const onRemoveMember = async () => {
    try {
      setIsSubmitting(true);
      await removeMember({ chat, memberId: member.id });
    } catch (error) {
      //   const msg = handleError(error);
      //   displayToast(msg, { type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full px-2 py-3 bg-transparent border-b hover:bg-slate-50 border-b-slate-200">
      <MemberItemDetails member={member} />
      {canEdit && !isMe && (
        <Button
          variant="secondary"
          size="icon"
          className="relative rounded-full aspect-1 p-0 w-8 h-8"
          disabled={isSubmitting}
          onClick={onRemoveMember}
        >
          {isSubmitting ? <Loader /> : <UserMinus className="w-4 h-4" />}
        </Button>
      )}
      {isOwner && (
        <span className="text-xs bg-muted py-1 px-2 rounded-md">Admin</span>
      )}
    </div>
  );
};

export default MemberItem;
