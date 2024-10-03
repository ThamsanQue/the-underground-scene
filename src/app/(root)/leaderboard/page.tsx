import TopArtists from "@/components/leaderboard/list";
import { User } from "@/lib/types/types";
import { getAllArtistProfiles } from "@/server-actions/artist-profile";

const Leaderboard = async () => {
  const result = await getAllArtistProfiles();
  const artists: User[] = result.users || [];
  return (
    <div>
      <TopArtists artists={artists} />
    </div>
  );
};

export default Leaderboard;
