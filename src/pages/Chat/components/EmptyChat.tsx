import { useNavigate } from "react-router-dom";
import { MessageCircleX } from "lucide-react";

import { Button } from "components/ui/button";

const EmptyChat = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center space-y-6">
        <MessageCircleX className="w-10 h-10" />
        <p className="text-slate-600">Select a chat to start messaging.</p>
        <Button color="secondary" onClick={() => navigate("/chats")}>
          Go to chats
        </Button>
      </div>
    </div>
  );
};

export default EmptyChat;
