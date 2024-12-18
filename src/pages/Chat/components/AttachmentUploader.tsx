import { useState, useRef, ChangeEvent } from "react";
import { Plus, Send, Paperclip } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

import { Chat } from "lib/types";
import useStore from "lib/stores";
import { getTypeOfAttachment, isAttachmentTypeAllowed } from "lib/utils";
import { Button } from "components/ui/button";
import Dialog from "components/Dialog";
import Loader from "components/Loader";
import AttachmentUploaderPreview from "./AttachmentUploaderPreview";

const AttachmentUploader = ({ chat }: { chat: Chat }) => {
  const { createAttachmentMsg } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const onModalOpen = () => setModalOpen(true);
  const onModalClose = () => setModalOpen(false);

  const onClick = () => {
    hiddenFileInput.current?.click();
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const _onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const attachment = event.target?.files?.[0] as File;
    const isAllowed = isAttachmentTypeAllowed(attachment.type);

    if (!isAllowed) {
      // TODO: Show feedback UI
      return;
    }

    if (attachment.size > 1048576) {
      console.log("exceeds 1 MB");
      return;
    }

    setAttachment(attachment);
    event.target.value = "";
  };

  const onCreateMsg = async () => {
    try {
      if (!attachment) return;
      setIsSubmitting(true);
      const blob = new Blob([attachment], { type: attachment.type });
      await createAttachmentMsg({
        blob,
        chat,
        text: caption,
        replyUid: "",
        attachment: {
          type: getTypeOfAttachment(attachment.type),
          name: attachment.name,
          size: attachment.size,
          mimeType: blob.type,
        },
      });
      setAttachment(null);
      setCaption("");
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsSubmitting(false);
      onModalClose();
    }
  };

  return (
    <Dialog
      className="h-[calc(100vh-170px)]"
      title="Share attachments"
      open={modalOpen}
      onOpenChange={setModalOpen}
      onClose={onModalClose}
      trigger={
        <Button
          size="icon"
          className="relative w-8 h-8 p-0 rounded-full aspect-1"
          onClick={onModalOpen}
        >
          <Plus className="w-4 h-4" />
        </Button>
      }
    >
      <div className="flex flex-col justify-center flex-1 mx-auto">
        {attachment ? (
          <div className="overflow-hidden rounded-md max-h-96">
            <AttachmentUploaderPreview attachment={attachment} />
          </div>
        ) : (
          <Paperclip className="w-16 h-16" />
        )}
      </div>

      <div className="flex flex-col gap-10">
        <Button onClick={onClick}>Choose attachment</Button>
        <div className="flex gap-3">
          <TextareaAutosize
            className="self-center w-full p-2 px-3 py-2 transition-all border rounded-md resize-none border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:shadow-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 no-scrollbar"
            placeholder="Add caption..."
            maxRows={3}
            onChange={onTextChange}
            value={caption}
          />

          <div className="self-end py-2">
            <Button
              size="sm"
              className="w-8 h-8 p-0 rounded-full aspect-1"
              onClick={onCreateMsg}
              disabled={isSubmitting || !attachment}
            >
              {isSubmitting ? <Loader /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      <input
        type="file"
        accept="image/*,video/*,text/plain,application/json,application/pdf"
        // accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ref={hiddenFileInput}
        onChange={_onChange}
        style={{ display: "none" }}
      />
    </Dialog>
  );
};

export default AttachmentUploader;
