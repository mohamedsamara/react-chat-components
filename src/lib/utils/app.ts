import * as linkify from "linkifyjs";

import { ChatMsg, MsgAttachmentType } from "lib/types";
import { CHAT_MSG_ATTACHMENT_TYPES } from "../constants";

export const handleError = (error: unknown) => {
  let message = "Unknown Error";
  if (error instanceof Error) message = error.message;
  console.log("message", message);
  return message;
};

export const datesAreOnSameDay = (timestamp1: number, timestamp2: number) => {
  const first = new Date(timestamp1);
  const second = new Date(timestamp2);
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

export const getShowInfoBar = (msgs: ChatMsg[], msg: ChatMsg, i: number) => {
  const previous = getPreviousMsg(msgs, i);
  if (!previous) return true;

  const isSameSender = previous.sender.id === msg.sender.id;
  const isSameDay = datesAreOnSameDay(previous.createdAt, msg.createdAt);

  if (isSameSender && !isSameDay) return true;
  if (isSameSender) return false;

  return true;
};

const getPreviousMsg = (msgs: ChatMsg[], i: number) => {
  if (i === 0) return null;
  const previous = msgs[i - 1];
  return previous;
};

export const processMsgs = (msgs: ChatMsg[], userId: string) => {
  return msgs
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((msg, i) => {
      msg.showInfoBar = getShowInfoBar(msgs, msg, i);
      msg.isMe = userId === msg.sender.id;
      return msg;
    });
};

export const isAttachmentTypeAllowed = (type: string) =>
  [
    "image/gif",
    "image/png",
    "image/jpeg",
    "image/webp",
    "video/mp4",
    "audio/webm",
    "audio/mp4",
    "application/json",
    "application/pdf",
    "text/plain",
  ].includes(type);

export const getTypeOfAttachment = (mimeType: string) => {
  let type = "file";
  if (mimeType.startsWith("image/")) type = "image";
  if (mimeType.includes("video/")) type = "video";
  if (mimeType.includes("audio/")) type = "audio";

  return CHAT_MSG_ATTACHMENT_TYPES[type.toUpperCase() as MsgAttachmentType];
};

export const isLink = (text: string) => linkify.find(text, "url").length > 0;
export const extractLink = (text: string) => linkify.find(text, "url")[0].href;

export const isValidLink = (str: string) => {
  const res = str.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  );
  return res !== null;
};

export const segregateMsgText = (text: string) => {
  const words = text.split(" ");
  const content = [];

  let link = "";
  let isValid = false;

  for (const word of words) {
    const isLinkPresent = isLink(word);

    if (isLinkPresent && isValidLink(word)) {
      isValid = true;
      link = isLinkPresent ? extractLink(word) : "";

      content.push({
        isLink: true,
        text: word,
      });
    } else {
      content.push({
        isLink: false,
        text: word,
      });
    }
  }

  return { content, link, isValidLink: isValid };
};
