"use client";
// pages/index.js
import Image from "next/image";
import { Crown, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { FlameIcon } from "lucide-react";
import Link from "next/link";
import { SocialIcons } from "../socialIcons";
import { LeadderboardProfiles } from "../Profiles/leaderboard-profiles";
import Top1Skeleton from "./top-1-sekeleton";
import LeaderboardInfoBanner from "./leaderboard-info-banner";
import { User } from "@/lib/types/types";

interface TopArtistsProps {
  artists: User[];
}

const TopArtists = ({ artists }: TopArtistsProps) => {
  const topArtist = artists
    .filter((artist) => artist.dropLinks.length >= 100)
    .sort((a, b) => b.dropLinks.length - a.dropLinks.length)[0];

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-lg md:text-xl font-bold">Creatives</h1>
        <nav className="text-sm md:text-lg">
          <ul className="flex space-x-4">
            <li>
              <span className="text-gray-700 dark:text-gray-300 flex ">
                <FlameIcon className="mr-2 fill-primary stroke-black dark:stroke-white" />{" "}
                Flames
              </span>
            </li>
            <li>
              <Link
                href="/leaderboard/redFlames"
                className="text-gray-400 dark:text-gray-700 flex"
              >
                <FlameIcon className="mr-2 fill-red-600 stroke-black dark:stroke-white" />{" "}
                Flames
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {topArtist ? (
        <section className="relative text-center mb-8">
          <div className="relative inline-block">
            <Link href={`/dashboard/${topArtist?.id}`}>
              <Avatar className=" w-24 h-24 hover:border-primary transition duration-300 ease-in-out border-2">
                {topArtist.image ? (
                  <Image
                    src={topArtist.image}
                    alt={topArtist.name || "Top Artist"}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                ) : (
                  <AvatarFallback>
                    <UserIcon className="w-12 h-12" />
                  </AvatarFallback>
                )}
              </Avatar>
              <Crown className="absolute top-0 right-0 w-7 h-7 text-primary bg-background rounded-full p-1" />
            </Link>
          </div>
          <div className="mt-4">
            <span className="p-2 font-semibold text-primary mt-4 bg-secondary dark:bg-secondary/30 rounded-md">
              {topArtist?.title}
            </span>
          </div>
          <h2 className="text-xl font-semibold mt-4">{topArtist?.name}</h2>
          <span className="text-gray-300 font-semibold dark:text-gray-700">
            The Icon Living
          </span>

          <div className="flex flex-col items-center justify-center  mt-4 ">
            <div className="flex gap-4 mb-4">
              {topArtist?.socialLinks.map((item) => (
                <Link key={item.id} href={item.link} target="_blank">
                  <SocialIcons link={item.link} />
                </Link>
              ))}
            </div>
            <div className=" flex gap-4">
              <div className="flex items-center gap-1">
                <FlameIcon className="w-5 h-5 fill-primary stroke-black dark:stroke-white inline-block stroke-2 animate-pulse" />
                <p className="text-primary font-semibold animate-pulse">
                  {topArtist?.dropLinks.length}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Top1Skeleton />
      )}

      <section className="overflow-y-auto h-[400px] custom-scrollbar">
        <div className="space-y-4">
          {artists
            .filter((artist) => artist?.id !== topArtist?.id)
            .sort((a, b) => b.dropLinks.length - a.dropLinks.length)
            .map((artist, index) => (
              <div
                key={artist.id}
                className="flex items-center p-4 dark:bg-secondary/30 bg-secondary rounded-lg"
              >
                {topArtist && (
                  <span className="text-primary font-semibold text-sm md:text-md w-6">
                    {index + 2}
                  </span>
                )}
                <LeadderboardProfiles artist={artist} />
                <div className="flex flex-grow items-center space-x-4 ml-4">
                  <span className="text-sm md:text-md">@{artist.name}</span>
                  <span className="text-sm md:text-md text-muted-foreground font-semibold flex-grow">
                    {artist.title}
                  </span>
                  <div className="flex items-center">
                    <FlameIcon className="w-4 h-4 md:w-5 md:h-5 fill-primary stroke-black dark:stroke-white stroke-2 mr-1" />
                    <span className="text-primary text-sm md:text-md">
                      {artist.dropLinks.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <LeaderboardInfoBanner />
    </div>
  );
};

export default TopArtists;
