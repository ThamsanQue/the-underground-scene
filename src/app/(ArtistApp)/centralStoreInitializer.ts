"use client";

import useArtistStore from "@/zustand/useArtistStore";
// CentralClientInitializer.js (Client Component)
import { useEffect } from "react";

const CentralClientInitializer = ({ artistProfile, artistDrops }: any) => {
  const setArtistProfile = useArtistStore((state) => state.setArtistProfile);
  const setArtistDrops = useArtistStore((state) => state.setArtistDrops);

  useEffect(() => {
    if (artistProfile) {
      setArtistProfile(artistProfile);
    }

    if (artistDrops) {
      setArtistDrops(artistDrops);
    }
  }, [artistProfile, setArtistProfile, artistDrops, setArtistDrops]);

  return null;
};

export default CentralClientInitializer;
