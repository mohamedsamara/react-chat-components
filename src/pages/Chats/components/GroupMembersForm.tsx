import { CircleX } from "lucide-react";

import { ChatMember } from "lib/types";
import { useProfilesSearch } from "lib/hooks";
import { Checkbox } from "components/ui/checkbox";
import { Input } from "components/ui/input";
import UserAvatar from "components/UserAvatar";
import { Button } from "components/ui/button";
import { MemberItemDetails } from "pages/ChatSettings/components";

type Props = {
  selectedMembers: ChatMember[];
  onMemberSelectChange: (isSelected: boolean, member: ChatMember) => void;
};

const GroupMembersForm = ({ selectedMembers, onMemberSelectChange }: Props) => {
  const { profile, onSearchChange } = useProfilesSearch();

  return (
    <div className="flex flex-col h-full gap-4">
      <Input
        className="w-full py-4 rounded-xl"
        placeholder="Type user id..."
        onChange={onSearchChange}
      />
      <div className="flex flex-col gap-3 max-h-[calc(100%-140px)] overflow-x-hidden overflow-y-auto no-scrollbar">
        {selectedMembers.length > 0 && (
          <div className="flex items-center gap-4 mb-4 overflow-x-auto flex-nowrap no-scrollbar">
            {selectedMembers.map((m, idx) => (
              <div className="relative" key={idx}>
                <div className="absolute -right-[10px] z-50">
                  <Button
                    variant="none"
                    size="icon"
                    className="p-0 w-4 h-4"
                    onClick={() => onMemberSelectChange(false, m)}
                  >
                    <CircleX
                      className="text-red-400 cursor-pointer"
                      onClick={() => onMemberSelectChange(false, m)}
                    />
                  </Button>
                </div>
                <UserAvatar src={m.avatar} alias={m.name} size="lg" />
              </div>
            ))}
          </div>
        )}

        {profile && (
          <div>
            <p className="mb-2 text-slate-600">More People</p>
            <MemberItem
              member={profile}
              onMemberSelectChange={onMemberSelectChange}
              selectedMembers={selectedMembers}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupMembersForm;

const MemberItem = ({
  member,
  onMemberSelectChange,
  selectedMembers,
}: {
  member: ChatMember;
  onMemberSelectChange: (isSelected: boolean, member: ChatMember) => void;
  selectedMembers: ChatMember[];
}) => {
  return (
    <div className="flex flex-row items-center w-full px-2 py-3 bg-transparent border-b hover:bg-slate-50 border-b-slate-200">
      <div className="flex-1">
        <label
          htmlFor={`checkbox-${member.id}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <MemberItemDetails member={member} />
        </label>
      </div>
      <Checkbox
        id={`checkbox-${member.id}`}
        checked={selectedMembers.find((m) => m.id === member.id) ? true : false}
        onCheckedChange={(checked: boolean) =>
          onMemberSelectChange(checked, member)
        }
      />
    </div>
  );
};
