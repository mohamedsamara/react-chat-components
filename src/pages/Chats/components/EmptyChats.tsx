import { MessageCircleMore } from "lucide-react";

const EmptyChats = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center space-y-6">
        <MessageCircleMore className="h-10 w-10" />
        <p className="text-slate-600">Select a chat to start messaging.</p>
      </div>
    </div>
  );
};

export default EmptyChats;
