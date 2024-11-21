import {
  CHAT_TYPES,
  CHAT_MSG_TYPES,
  CHAT_MSG_ATTACHMENT_TYPES,
  ATTACHMENT_DISPLAY_STATUS,
  AUDIO_RECORDING_STATUS,
} from "lib/constants";

export type ChatType = keyof typeof CHAT_TYPES;
export type MsgType = keyof typeof CHAT_MSG_TYPES;
export type MsgAttachmentType = keyof typeof CHAT_MSG_ATTACHMENT_TYPES;

/* FORMS */
export type ProfilePayload = {
  name: string;
};

export type CreateGroupPayload = {
  name: string;
  avatar: string;
  memberIds: string[];
};

export type UpdateChatPayload = {
  chat: Chat;
  name: string;
  avatar: string;
};

export type RemoveChatMemberPayload = {
  chat: Chat;
  memberId: string;
};

export type AddChatMemberPayload = {
  chat: Chat;
  members: ChatMember[];
};

export type CreateMsgPayload = {
  chat: Chat;
  text: string;
  replyUid: string;
};

export type CreateAttachmentMsgPayload = CreateMsgPayload & {
  blob: Blob;
  attachment: {
    type: MsgAttachmentType;
    name: string;
    size: number;
    mimeType: string;
    duration?: number;
  };
};

export type ChatAttachmentMsgsFilterType = "MEDIA" | "AUDIO" | "FILE";

export type ChatAttachmentMsgsFilterPayload = {
  chatId: string;
  type: ChatAttachmentMsgsFilterType;
};

/* RECORDS */
export type Profile = {
  id: string;
  name: string;
  avatar: string;
};

export type ChatMember = Profile;
export type Sender = Profile;

export type LastMsg = ChatMsg;

export type Chat = {
  id: string;
  name: string;
  avatar: string;
  type: ChatType;
  memberIds: string[];
  members: ChatMember[];
  ownerId: string;
  lastMsg: LastMsg | null;
  deleted: boolean;
  createdAt: number;
  updatedAt: number;
};

export type ChatMsg = {
  id: string;
  sender: Sender;
  text: string;
  type: MsgType;
  createdAt: number;
  showInfoBar: boolean;
  isMe: boolean;
  replyId: string;
  reply: ChatMsg | null;
  attachment: Attachment | null;
  chatId: string;
};

export type Attachment = {
  id: string;
  url: string;
  type: MsgAttachmentType;
  name: string;
  size: number;
  mimeType: AttachmentMimeType;
  duration?: number;
  blob?: Blob; // Made optional if needed
};

/* UI */
export type ReplyScroll = {
  visible: boolean;
  id: string;
};

export type AttachmentViewerParams = ChatMsg;

export type AttachmentViewer = {
  visible: boolean;
  params: AttachmentViewerParams | null;
};

export type AttachmentDisplayStatus = keyof typeof ATTACHMENT_DISPLAY_STATUS;
export type AudioRecordingStatus = keyof typeof AUDIO_RECORDING_STATUS;

export type AttachmentMimeType =
  | "image/gif"
  | "image/png"
  | "image/jpeg"
  | "image/webp"
  | "video/mp4"
  | "audio/webm"
  | "audio/mp4"
  | "application/json"
  | "application/pdf"
  | "text/plain";
