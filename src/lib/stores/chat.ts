import { StateCreator } from "zustand";

import {
  Chat,
  ChatMember,
  CreateAttachmentMsgPayload,
  CreateGroupPayload,
  CreateMsgPayload,
  UpdateChatPayload,
  AddChatMemberPayload,
  RemoveChatMemberPayload,
} from "lib/types";
import { chatsData } from "lib/data";

export interface ChatsSlice {
  chats: Chat[];
  getChatById: (id: string) => Chat | null;
  getChatMembers: (id: string) => ChatMember[];
  createConversation: (profileId: string) => void;
  createGroup: (payload: CreateGroupPayload) => void;
  createMsg: (payload: CreateMsgPayload) => void;
  createAttachmentMsg: (payload: CreateAttachmentMsgPayload) => void;
  updateChat: (payload: UpdateChatPayload) => void;
  deleteChat: (chat: Chat) => void;
  addMember: (payload: AddChatMemberPayload) => void;
  removeMember: (payload: RemoveChatMemberPayload) => void;
}

export const createChatsSlice: StateCreator<ChatsSlice> = (set, get) => {
  const initialState = localStorage.getItem("app-storage");
  if (!initialState) {
    set({ chats: chatsData });
  }
  return {
    chats: chatsData,
    getChatById: (id: string) =>
      get().chats.find((chat) => chat.id === id) ?? null,
    getChatMembers: (id: string) =>
      get().chats.find((chat) => chat.id === id)?.members ?? [],
    createConversation: (profileId: string) => {
      console.log("Creating conversation with profileId:", profileId);
    },
    createGroup: (payload: CreateGroupPayload) => {
      console.log("Creating group:", payload);
    },
    createMsg: (payload: CreateMsgPayload) => {
      console.log("Creating message:", payload);
    },
    createAttachmentMsg: (payload: CreateAttachmentMsgPayload) => {
      console.log("Creating attachment message:", payload);
    },
    updateChat: (payload: UpdateChatPayload) => {
      console.log("Updating chat:", payload);
    },
    deleteChat: (chat: Chat) => {
      console.log("Deleting chat:", chat);
    },
    addMember: ({ chat, members }: AddChatMemberPayload) => {
      console.log("Adding members:", members, "to chat:", chat);
    },
    removeMember: ({ chat, memberId }: RemoveChatMemberPayload) => {
      console.log("Removing member:", memberId, "from chat:", chat);
    },
  };
};
