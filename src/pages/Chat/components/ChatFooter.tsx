import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { Send } from "lucide-react";

import EE, { REPLY_MSG } from "lib/ee";
import { Chat, ChatMsg } from "lib/types";
import Fade from "components/Animations";
import Loader from "components/Loader";
import { Button } from "components/ui/button";
import ReplyFooter from "./ReplyFooter";
import AttachmentUploader from "./AttachmentUploader";
import AudioRecorder from "./AudioRecorder";

const ChatFooter = ({ chat }: { chat: Chat }) => {
  const msgRef = useRef<HTMLTextAreaElement | null>(null);
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reply, setReply] = useState<ChatMsg | null>(null);
  const location = useLocation();

  useEffect(() => {
    msgRef.current?.focus();
  }, []);

  useEffect(() => {
    if (reply) setReply(null);
  }, [location]);

  useEffect(() => {
    EE.on(REPLY_MSG, displayReply);
    return () => {
      EE.removeListener(REPLY_MSG, displayReply);
    };
  }, []);

  const displayReply = (msg: ChatMsg) => {
    if (msg) setReply(msg);
  };

  const onCreateMsg = async () => {
    try {
      setIsSubmitting(true);
      console.log({
        chat,
        text: msg.trim(),
        replyUid: reply?.id ?? "",
      });
      setMsg("");
      setReply(null);
      msgRef.current?.focus();
    } catch (error) {
      console.log("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.target.value);
  };

  const onCloseReply = () => {
    setReply(null);
  };

  const isSendBtnDisabled = msg.trim().length === 0 || isSubmitting;
  const showAudioRecorder = !reply && msg.trim().length === 0;

  return (
    <>
      <Fade visible={reply ? true : false}>
        {reply && <ReplyFooter msg={reply} onClose={onCloseReply} />}
      </Fade>

      <div className="relative flex gap-3 px-4 py-[2.5px] border-t border-t-gray-200 bg-white w-full">
        <div className="self-end py-2">
          <AttachmentUploader chat={chat} />
        </div>

        <TextareaAutosize
          className="self-center w-full p-2 px-3 py-2 transition-all border-none resize-none focus:outline-none focus:shadow-outline no-scrollbar"
          placeholder="Type..."
          maxRows={10}
          onChange={onChange}
          value={msg}
          ref={msgRef}
          // onFocus={scrollToBottom}
        />
        <div className="self-end py-2">
          <Button
            size="sm"
            className="w-8 h-8 p-0 rounded-full aspect-1"
            onClick={onCreateMsg}
            disabled={isSendBtnDisabled}
          >
            {isSubmitting ? <Loader /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        {showAudioRecorder && (
          <div className="self-end py-2">
            <AudioRecorder chat={chat} />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatFooter;
