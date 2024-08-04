"use client";

import {
  FaInstagram,
  FaSoundcloud,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import { BookUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";

export const SocialIcons = ({ platform }) => {
  const SocialIcon = () => {
    switch (platform) {
      case "soundcloud":
        return (
          <FaSoundcloud className="h-5 w-5 text-[#adb5bd] hover:text-primary dark:text-white dark:hover:text-primary" />
        );
      case "instagram":
        return (
          <FaInstagram className="h-5 w-5 text-[#adb5bd] dark:text-white hover:text-primary dark:hover:text-primary" />
        );
      case "whatsapp":
        return (
          <FaWhatsapp className="h-5 w-5 text-[#adb5bd] dark:text-white hover:text-primary dark:hover:text-primary" />
        );
      case "tiktok":
        return (
          <FaTiktok className="h-5 w-5 text-[#adb5bd] dark:text-white hover:text-primary dark:hover:text-primary" />
        );
      case "youtube":
        return (
          <FaYoutube className="h-5 w-5 text-[#adb5bd] dark:text-white hover:text-primary dark:hover:text-primary" />
        );
      default:
        return null;
    }
  };

  return <SocialIcon />;
};

export const SocialLinks = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <BookUser className="h-[1.2rem] w-[1.2rem] text-[#adb5bd] hover:text-primary dark:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <Link href="/" className="flex items-center gap-2">
            <FaDiscord className="h-4 w-4" />
            Discord
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/leaderboard" className="flex items-center gap-2">
            <FaInstagram className="h-4 w-4" />
            Instagram
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="#" className="flex items-center gap-2">
            <FaGithub className="h-4 w-4" />
            Github
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
