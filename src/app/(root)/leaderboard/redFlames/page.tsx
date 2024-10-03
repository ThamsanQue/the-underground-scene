import RedFlames from "@/components/leaderboard/red-flames";
import { getAllDrops } from "@/server-actions/artist-drops";

const RedFlamesPage = async () => {
  const allDropsResult = await getAllDrops();
  const allDrops: any = allDropsResult.success ? allDropsResult.drops : [];
  return (
    <div>
      <RedFlames allDrops={allDrops} />
    </div>
  );
};

export default RedFlamesPage;
