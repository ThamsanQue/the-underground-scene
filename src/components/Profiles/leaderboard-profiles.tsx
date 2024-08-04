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

const socialLinks = [
  {
    platform: "instagram",
    link: "https://www.instagram.com/janesmith",
  },
  {
    platform: "tiktok",
    link: "https://www.tiktok.com/@janesmith",
  },
  {
    platform: "youtube",
    link: "https://www.youtube.com/c/janesmith",
  },
];

export const LeadderboardProfiles = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div>
      {isDesktop ? (
        <Dialog>
          <DialogTrigger asChild>
            <Avatar className="w-10 h-10 ml-4 border-2 border-primary cursor-pointer hover:border-blue-500 transition duration-300 ease-in-out">
              <Image
                src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100278.jpg?size=626&ext=jpg&ga=GA1.1.1170908441.1717942768&semt=sph"
                alt="Alfredo Siphron"
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
            <div className="flex flex-col items-center p-4">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoverartworks.com%2Fwp-content%2Fuploads%2F2020%2F06%2FUNTITLED_2_Preview.jpg&f=1&nofb=1&ipt=559686d51447b2e5b87fc6721444349d4ef8da36cbc0ccd87df08b8602a4e940&ipo=images"
                alt="Profile background"
                className="w-full h-64 object-cover rounded-md"
              />
              <Avatar className="mt-[-40px] w-20 h-20 rounded-full">
                <AvatarImage src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100278.jpg?size=626&ext=jpg&ga=GA1.1.1170908441.1717942768&semt=sph" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold">@Alexandra Sarah</h2>
                <p className="p-2 font-semibold text-primary mt-2 bg-secondary dark:bg-secondary/30 rounded-md">
                  Creative Director
                </p>
              </div>

              <div className="flex justify-center space-x-6 w-full mt-4 mb-4">
                {socialLinks.map((item) => (
                  <Link
                    key={item.platform}
                    href={item.link}
                    aria-label={item.platform}
                  >
                    <SocialIcons platform={item.platform} />
                  </Link>
                ))}
              </div>
              <div className="flex justify-center space-x-6 ml-2">
                <div className="flex items-center gap-1">
                  <FlameIcon className="h-5 w-5 fill-primary stroke-white" />
                  <span className="text-sm md:text-lg font-semibold text-primary">
                    10k
                  </span>
                </div>
              </div>
              <Link href="/dashboard">
                <Button className=" mt-4" variant="outline">
                  View their Drops
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <Avatar className="w-10 h-10 ml-4 border-2 border-primary cursor-pointer">
              <Image
                src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100278.jpg?size=626&ext=jpg&ga=GA1.1.1170908441.1717942768&semt=sph"
                alt="Alfredo Siphron"
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
            <div className="flex flex-col items-center p-4">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoverartworks.com%2Fwp-content%2Fuploads%2F2020%2F06%2FUNTITLED_2_Preview.jpg&f=1&nofb=1&ipt=559686d51447b2e5b87fc6721444349d4ef8da36cbc0ccd87df08b8602a4e940&ipo=images"
                alt="Profile background"
                className="w-full h-60 object-cover rounded-t-md"
              />
              <Avatar className="mt-[-40px] w-20 h-20 rounded-full">
                <AvatarImage src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100278.jpg?size=626&ext=jpg&ga=GA1.1.1170908441.1717942768&semt=sph" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold">@Alexandra Sarah</h2>
                <p className="p-2 font-semibold text-primary mt-2 bg-secondary dark:bg-secondary/30 rounded-md">
                  Creative Director
                </p>
              </div>

              <div className="flex justify-center space-x-6 w-full mt-4 mb-4">
                {socialLinks.map((item) => (
                  <Link
                    key={item.platform}
                    href={item.link}
                    aria-label={item.platform}
                  >
                    <SocialIcons platform={item.platform} />
                  </Link>
                ))}
              </div>
              <div className="flex justify-center space-x-6">
                <div className="flex items-center gap-1">
                  <FlameIcon className="h-5 w-5 fill-primary stroke-white" />
                  <span className="text-sm md:text-lg font-semibold text-primary">
                    10k
                  </span>
                </div>
              </div>
              <Link href="/dashboard">
                <Button className=" mt-4" variant="outline">
                  View their Drops
                </Button>
              </Link>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
