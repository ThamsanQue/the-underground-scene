import { UserProfile } from "@/components/Profiles/user-profile";
import CentralClientInitializer from "../../centralStoreInitializer";
import { currentUser } from "@/lib/auth";
import { getArtistProfile } from "@/server-actions/artist-profile";
import { getTotalDrops } from "@/server-actions/artist-drops";

const Dashboard = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const userToGet = user?.id === params.id ? user?.id : params.id;
  const res = await getArtistProfile(userToGet);
  const artistProfile = res.success ? res.user : null;
  const artistDrops = res.success ? await getTotalDrops(params.id) : null;
  const totalDrops = artistDrops?.totalDrops;

  return (
    <div>
      <CentralClientInitializer
        artistProfile={artistProfile}
        artistDrops={totalDrops}
      />
      <UserProfile />
    </div>
  );
};

export default Dashboard;
