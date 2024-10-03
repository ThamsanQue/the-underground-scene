// useArtistStore.js
import { DropLink, User } from "@/lib/types/types";
import { create } from "zustand";

interface ArtistStoreState {
  artistProfile: User | null;
  artistDrops: DropLink[];
  setArtistProfile: (profile: User) => void;
  setArtistDrops: (drops: DropLink[]) => void;
}

const useArtistStore = create<ArtistStoreState>((set) => ({
  artistProfile: null,
  artistDrops: [],
  setArtistProfile: (profile: User) => set({ artistProfile: profile }),
  setArtistDrops: (drops: DropLink[]) => set({ artistDrops: drops }),
}));

export default useArtistStore;
