import { StateCreator } from "zustand";

import { ReplyScroll, AttachmentViewer } from "lib/types";

export interface UiSlice {
  isStoreReady: boolean;
  replyScroll: ReplyScroll;
  attachmentViewer: AttachmentViewer;
  setIsStoreReady: (isReady: boolean) => void;
  setReplyScroll: (replyScroll: ReplyScroll) => void;
  setAttachmentViewer: (attachmentViewer: AttachmentViewer) => void;
}

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  isStoreReady: false,
  setIsStoreReady: (isReady: boolean) => set({ isStoreReady: isReady }),

  replyScroll: { visible: false, id: "" },
  setReplyScroll: ({ visible, id }: ReplyScroll) =>
    set({
      replyScroll: { visible, id },
    }),

  attachmentViewer: { visible: false, params: null },
  setAttachmentViewer: ({ visible, params }: AttachmentViewer) =>
    set({ attachmentViewer: { visible, params } }),
});
