import { useEffect, useMemo, useState } from "react";

import { Attachment, AttachmentDisplayStatus, ChatMsg } from "lib/types";
import { capitalize } from "lib/utils";

export const useMsgText = (msg: ChatMsg, isReply: boolean = false): string => {
  const t = useMemo(() => {
    const text =
      msg.text || isReply
        ? msg.text
        : capitalize(msg.attachment?.type.toLowerCase() || "") +
            " Attachment" || "";
    return text;
  }, [msg]);

  return t;
};

export const useAttachment = ({
  visible,
  attachment,
}: {
  visible: boolean;
  attachment: Attachment;
}) => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<AttachmentDisplayStatus>("LOADING");

  const checkAttachment = ({ url }: Attachment) => {
    if (url) {
      setUrl(url);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!visible || !attachment) return;
    checkAttachment(attachment);
  }, [visible, attachment]);

  return { loading, status, setStatus, url };
};
