import { create } from "zustand";
import { UserType } from "../types/types";

interface AuthUserDataState {
  user: UserType | null;
}

interface AuthUserDataActions {
  setUser: ({ user }: { user: UserType }) => void;
  clearState: () => void;
}

export const useAuthUser = create<AuthUserDataState & AuthUserDataActions>(
  (set) => ({
    user: null,
    setUser: ({ user }) => set({ user }),
    clearState: () => set({ user: null }),
  })
);
