import { StateCreator } from "zustand";

import { ChatAttachmentMsgsFilterPayload, ChatMsg } from "lib/types";
import { msgsData } from "lib/data";
import { processMsgs } from "lib/utils";
import { ProfileSlice } from "./profile";

export interface MsgsSlice {
  isInitialized: boolean;
  msgs: { [chatId: string]: ChatMsg[] };
  getChatMsgsById: (chatId: string) => ChatMsg[];
  getFilteredChatMsgsByType: (
    payload: ChatAttachmentMsgsFilterPayload
  ) => ChatMsg[];
}

export const createMsgsSlice: StateCreator<
  MsgsSlice & ProfileSlice,
  [],
  [],
  MsgsSlice
> = (set, get) => {
  const initialState = localStorage.getItem("app-storage");
  if (!initialState) {
    set({ msgs: msgsData });
  }
  return {
    isInitialized: false,
    msgs: msgsData,
    getChatMsgsById: (chatId: string) => {
      const msgs = get().msgs;
      const chatMsgs = msgs[chatId] || [];
      const processedMsgs = processMsgs(chatMsgs, get().profile.id);
      return processedMsgs;
    },
    getFilteredChatMsgsByType: ({
      chatId,
      type,
    }: ChatAttachmentMsgsFilterPayload) => {
      const msgs = get().getChatMsgsById(chatId);
      if (!msgs) return [];

      if (type === "MEDIA") {
        return msgs.filter(
          (msg) =>
            msg.attachment?.type === "VIDEO" || msg.attachment?.type === "IMAGE"
        );
      }
      return msgs.filter((msg) => msg.attachment?.type === type);
    },
  };
};
