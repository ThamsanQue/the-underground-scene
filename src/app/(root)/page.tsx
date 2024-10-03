import ProfileList from "@/components/Profiles/profile-list";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Top4Skeleton from "@/components/leaderboard/top-4-sekeleton";
import { getAllArtistProfiles } from "@/server-actions/artist-profile";

const Home = async () => {
  const allArtists = await getAllArtistProfiles();
  const artists = allArtists?.users;

  const top4Artists = artists
    ?.filter((artist) => artist.dropLinks.length >= 100)
    .sort((a, b) => b.dropLinks.length - a.dropLinks.length)
    .slice(0, 4);

  return (
    <main className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
        <div className="flex flex-wrap justify-center space-x-2">
          <span className="block text-3xl font-bold tracking-tighter bg-gradient-to-r from-[#ffa600] to-[#000000] dark:from-[#ffa600] dark:to-[#f2f2f2] bg-clip-text text-transparent sm:text-5xl md:text-6xl">
            Discover,
          </span>
          <span className="block text-3xl font-bold tracking-tighter bg-gradient-to-r from-[#ffa600] to-[#000000] dark:from-[#ffa600] dark:to-[#f2f2f2] bg-clip-text text-transparent sm:text-5xl md:text-6xl">
            Collaborate &
          </span>
          <span className="block text-3xl font-bold tracking-tighter bg-gradient-to-r from-[#ffa600] to-[#000000] dark:from-[#ffa600] dark:to-[#f2f2f2] bg-clip-text text-transparent sm:text-5xl md:text-6xl">
            Create
          </span>
        </div>
        <p className="max-w-[700px] text-gray-400 md:text-xl">
          Discover new talent, collaborate with like-minded creatives, and bring
          your artistic visions to life. Whether you&apos;re a musician, visual
          artist, performer or designer, our platform is designed to help you
          shine and gain the exposure and recognition you deserve from industry
          leaders.
        </p>
        <Separator className="my-4" />
        <div className="flex w-full justify-center">
          <Link href="/leaderboard">
            <Button variant="outline">View More Creatives</Button>
          </Link>
        </div>
        {top4Artists && top4Artists.length > 0 ? (
          <ProfileList profiles={top4Artists} />
        ) : (
          <Top4Skeleton />
        )}
      </div>
    </main>
  );
};

export default Home;
