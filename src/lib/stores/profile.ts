import { StateCreator } from "zustand";

import { Profile, ProfilePayload } from "lib/types";
import { profileData } from "lib/data";

export interface ProfileSlice {
  profile: Profile;
  uploadAvatar: (base64: string) => void;
  updateProfile: (payload: ProfilePayload) => void;
}

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => {
  const initialState = localStorage.getItem("app-storage");
  if (!initialState) {
    set({ profile: profileData });
  }
  return {
    profile: profileData,
    updateProfile: (payload: ProfilePayload) => {
      console.log(payload);
    },
    uploadAvatar: (base64: string) => {
      console.log(base64);
    },
  };
};
