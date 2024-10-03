"use client";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "../socialIcons";
import { FlameIcon } from "lucide-react";
import { Button } from "../ui/button";
import { User } from "@/lib/types/types";
import { placeholderImage } from "@/lib/utils";

interface Artist {
  artist: User & {
    dropCount?: number;
  };
}
export const LeadderboardProfiles = ({ artist }: Artist) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const ProfileMenu = () => {
    return (
      <div className="flex flex-col items-center p-4">
        <Image
          src={artist?.artcover || placeholderImage}
          alt="Profile background"
          width={400}
          height={64}
          className="w-full h-64 object-cover rounded-md"
        />
        <Avatar className="mt-[-40px] w-20 h-20 rounded-full">
          <AvatarImage src={artist?.image || placeholderImage} />
          <AvatarFallback>
            {(artist?.name && artist?.name.charAt(0)) || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">{artist?.name}</h2>
          <p className="p-2 font-semibold text-primary mt-2 bg-secondary dark:bg-secondary/30 rounded-md">
            {artist?.title}
          </p>
        </div>

        <div className="flex justify-center space-x-6 w-full mt-4 mb-4">
          {artist?.socialLinks.map((item) => (
            <Link key={item.id} href={item.link} target="_blank">
              <SocialIcons link={item.link} />
            </Link>
          ))}
        </div>
        <div className="flex justify-center space-x-6 ml-2">
          <div className="flex items-center gap-1">
            <FlameIcon className="h-5 w-5 fill-primary stroke-black dark:stroke-white" />
            <span className="text-sm md:text-lg font-semibold text-primary">
              {artist?.dropLinks?.length || artist?.dropCount}
            </span>
          </div>
        </div>
        <Link href={`/dashboard/${artist?.id}`}>
          <Button className=" mt-4" variant="outline">
            View their Drops
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div>
      {isDesktop ? (
        <Dialog>
          <DialogTrigger asChild>
            <Avatar className="w-10 h-10 ml-4 border-2 border-primary cursor-pointer hover:border-blue-500 transition duration-300 ease-in-out">
              <Image
                src={artist?.image || placeholderImage}
                alt={artist?.name || "?"}
                width={100}
                height={100}
                className="rounded-full"
              />
            </Avatar>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">Profile</DialogTitle>
            </DialogHeader>
            <ProfileMenu />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <Avatar className="w-10 h-10 ml-4 border-2 border-primary cursor-pointer">
              <Image
                src={artist?.image || placeholderImage}
                alt={artist?.name || "?"}
                width={100}
                height={100}
                className="rounded-full"
              />
            </Avatar>
          </DrawerTrigger>
          <DrawerContent className="sm:max-w-[425px]">
            <DrawerHeader>
              <DrawerTitle className="flex items-center">Profile</DrawerTitle>
            </DrawerHeader>
            <ProfileMenu />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
