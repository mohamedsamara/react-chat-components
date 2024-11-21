import { create } from "zustand";

import { createUiSlice, UiSlice } from "./ui";
import { createProfileSlice, ProfileSlice } from "./profile";
import { createChatsSlice, ChatsSlice } from "./chat";
import { createMsgsSlice, MsgsSlice } from "./msg";

type Store = UiSlice & ProfileSlice & ChatsSlice & MsgsSlice;

const useStore = create<Store>()((...a) => ({
  ...createUiSlice(...a),
  ...createProfileSlice(...a),
  ...createChatsSlice(...a),
  ...createMsgsSlice(...a),
}));

export default useStore;
