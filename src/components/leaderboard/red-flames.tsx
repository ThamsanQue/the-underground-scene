"use client";

import { FlameIcon } from "lucide-react";
import { Card } from "../ui/card";
import { LeadderboardProfiles } from "../Profiles/leaderboard-profiles";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { SocialIcons } from "../socialIcons";
import { decrementLike, incrementLike } from "@/server-actions/artist-drops";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ExtendedDropLink, User } from "@/lib/types/types";

interface RedFlamesProps {
  allDrops: ExtendedDropLink[];
}

interface UserWithDropCount extends User {
  dropCount: number;
}

interface LikesState {
  [key: string]: boolean;
}

interface SpinningState {
  [key: string]: boolean;
}
const RedFlames = ({ allDrops }: RedFlamesProps) => {
  const [likes, setLikes] = useState<LikesState>({});
  const [spinning, setSpinning] = useState<SpinningState>({});
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // number of Drops for each user
  const userDrops = allDrops.reduce<Record<string, number>>((acc, drop) => {
    const userId = drop.user.id;
    if (!acc[userId]) {
      acc[userId] = 0;
    }
    acc[userId]++;
    return acc;
  }, {});

  const usersWithDropCounts: UserWithDropCount[] = allDrops.map((drop) => {
    const userId = drop.user.id;
    const dropCount = userDrops[userId] || 0;
    return {
      ...drop.user,
      dropCount,
    };
  });

  const userLookup: Record<string, UserWithDropCount> =
    usersWithDropCounts.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<string, UserWithDropCount>);

  const loadLikesFromLocalStorage = () => {
    const storedLikes = JSON.parse(
      localStorage.getItem("likes") || "[]"
    ) as string[];
    const likeState: LikesState = {};
    storedLikes.forEach((id) => {
      likeState[id] = true;
    });
    setLikes(likeState);
  };

  useEffect(() => {
    loadLikesFromLocalStorage();
  }, []);

  const toggleLikeDrop = async (id: string) => {
    const isCurrentlyLiked = !!likes[id];

    // Update local storage
    const updatedLikes = { ...likes };
    setSpinning((prev) => ({ ...prev, [id]: true }));

    if (isCurrentlyLiked) {
      // Unlike
      delete updatedLikes[id];
      localStorage.setItem("likes", JSON.stringify(Object.keys(updatedLikes)));
      try {
        const res = await decrementLike(id);
        if (res.success) {
          setLikes(updatedLikes);
          setSpinning((prev) => ({ ...prev, [id]: false }));
        }
        if (res.error) {
          toast.error(res.error, {
            position: isDesktop ? "bottom-right" : "top-center",
          });
          setSpinning((prev) => ({ ...prev, [id]: false }));
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred",
          {
            position: isDesktop ? "bottom-right" : "top-center",
          }
        );
        setSpinning((prev) => ({ ...prev, [id]: false }));
      }
    } else {
      // Like
      updatedLikes[id] = true;
      localStorage.setItem("likes", JSON.stringify(Object.keys(updatedLikes)));
      try {
        const res = await incrementLike(id);
        if (res.success) {
          setLikes(updatedLikes);
          setSpinning((prev) => ({ ...prev, [id]: false }));
        }
        if (res.error) {
          toast.error(res.error, {
            position: isDesktop ? "bottom-right" : "top-center",
          });
          setSpinning((prev) => ({ ...prev, [id]: false }));
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred",
          {
            position: isDesktop ? "bottom-right" : "top-center",
          }
        );
        setSpinning((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-lg md:text-xl font-bold">Drops</h1>
        <nav className="text-sm md:text-lg">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/leaderboard"
                className="text-gray-400 dark:text-gray-700 flex "
              >
                <FlameIcon className="mr-2 fill-primary stroke-black dark:stroke-white" />{" "}
                Flames
              </Link>
            </li>
            <li>
              <span className=" text-gray-700 dark:text-gray-300 flex">
                <FlameIcon className="mr-2 fill-red-600 stroke-black dark:stroke-white" />{" "}
                Flames
              </span>
            </li>
          </ul>
        </nav>
      </header>

      <section className="overflow-y-auto h-[750px] custom-scrollbar">
        <div className="space-y-4">
          {allDrops?.map((drop, index) => {
            const user = userLookup[drop?.user?.id];
            return (
              <Card className="flex flex-col gap-4 p-4" key={drop?.id}>
                <div className="flex items-center gap-1">
                  <span className="text-primary font-semibold text-sm md:text-md">
                    {index + 1}
                  </span>
                  <LeadderboardProfiles artist={user} />
                  <span className="ml-2">{drop?.title}</span>
                </div>
                <div className="flex flex-col gap-2 items-start ml-4">
                  <p className="text-muted-foreground">{drop?.description}</p>
                  <div className="flex gap-2 ml-auto">
                    {drop?.urls.map((url, index) => (
                      <Button variant={"outline"} size={"icon"} key={index}>
                        <Link href={url} target="_blank">
                          <SocialIcons link={url} />
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground flex justify-between items-center mt-4 ml-4">
                  <time>{formatDate(drop?.postedAt.toISOString())}</time>
                  <span
                    className="flex items-center font-semibold text-md"
                    onClick={() => toggleLikeDrop(drop?.id)}
                  >
                    <FlameIcon
                      className={`h-6 w-6 ${
                        likes[drop?.id] ? "fill-red-600" : ""
                      } cursor-pointer mr-2 ${
                        spinning[drop?.id] ? "animate-pulse" : ""
                      }`}
                      key={drop?.id}
                    />
                    {drop?.likes}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RedFlames;
