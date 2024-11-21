import { useState, useCallback, ChangeEvent } from "react";

import { Profile } from "lib/types";
import { useDebounce } from "./ui";

export const useProfilesSearch = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const searchProfiles = async (search: string) => {
    try {
      if (!search) {
        setProfile(null);
        return;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearch = (search: string) => searchProfiles(search);

  const debouncedOnChange = useCallback(useDebounce(handleSearch, 500), []);
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(e.target.value);
  };

  return { profile, onSearchChange };
};
