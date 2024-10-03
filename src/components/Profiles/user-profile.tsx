"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FlameIcon } from "lucide-react";
import { ProgressTracker } from "../progress-tracker";
import { ProfileMenu } from "../settings/profile-menu";
import { ProfileSettings } from "../settings/profile-settings";
import { CreateDrop } from "./drops/create-drop";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import useArtistStore from "@/zustand/useArtistStore";
import { createHeatMapData, formatDate, placeholderImage } from "@/lib/utils";
import Link from "next/link";
import { SocialIcons } from "../socialIcons";
import ACF from "../../assets/icons/artcoverfallback.png";
import Image from "next/image";

export const UserProfile = () => {
  const user = useCurrentUser();
  const artistProfile = useArtistStore((state) => state.artistProfile);
  const artistDrops = useArtistStore((state) => state.artistDrops);
  const totalDropsCount = artistDrops?.length;
  const totalDrops = artistDrops;
  const heatMapData = createHeatMapData(totalDrops);
  const isNotCurrentUser = user?.id != artistProfile?.id;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="relative">
        <Image
          src={artistProfile?.artcover || ACF}
          width={1920}
          height={480}
          alt="Artcover"
          className="w-full h-[240px] md:h-[480px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-[-50px]   md:bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
            <ProfileMenu
              avatarUrl={artistProfile?.image || placeholderImage}
              name={artistProfile?.name}
              isNotCurrentUser={isNotCurrentUser}
            />
            <div className="space-y-1 flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold md:text-3xl">
                {artistProfile?.name || user?.email}
              </h1>
              <p className="text-sm text-primary font-semibold md:text-base">
                {artistProfile?.title || "Artist"}
              </p>
            </div>
            <div>
              {!isNotCurrentUser && (
                <div className="flex gap-2">
                  <ProfileSettings userId={user?.id} />
                  <CreateDrop userId={user?.id} />
                </div>
              )}

              <div className="flex flex-col items-center gap-2 mt-4">
                <ProgressTracker data={heatMapData} />
                <div className="text-sm flex space-x-1 text-primary">
                  <FlameIcon className="h-4 w-4 mr-1 fill-primary stroke-black dark:stroke-white" />{" "}
                  Flame:
                  <span className="font-bold">{totalDropsCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-240px)]">
        <div className="container px-4 md:px-6 py-8 md:py-12 mt-8 md:mt-0">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {totalDrops?.map((drop) => (
              <Card className="flex flex-col gap-4 p-4" key={drop.id}>
                <CardHeader>
                  <CardTitle>{drop?.title}</CardTitle>
                  <CardDescription>{drop?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground flex justify-between items-center">
                    <time>{formatDate(drop?.postedAt.toISOString())}</time>
                    {drop?.urls.map((url, index) => (
                      <Button variant={"outline"} size={"icon"} key={index}>
                        <Link href={url} target="_blank">
                          <SocialIcons link={url} />
                        </Link>
                      </Button>
                    ))}
                    <span className="flex items-center">
                      {drop?.likes}{" "}
                      <FlameIcon className="h-5 w-5 ml-2 fill-red-600 stroke-black dark:strok-white" />{" "}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
