"use client";

import { HomeIcon, FlameIcon, MenuIcon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "next-auth/react";

interface ProfileMenuProps {
  avatarUrl?: string;
  name?: string | null;
  isNotCurrentUser?: boolean;
}
export const ProfileMenu = ({
  avatarUrl,
  name,
  isNotCurrentUser,
}: ProfileMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-16 h-16 md:w-24 md:h-24 border-2 border-primary cursor-pointer hover:border-blue-500 transition duration-300 ease-in-out">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <Link href="/">
          <DropdownMenuItem className="flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            Home
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FlameIcon className="h-4 w-4 mr-2" />
            Flames
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <Link href="/leaderboard">
                <DropdownMenuItem className="flex items-center gap-2">
                  <FlameIcon className="h-4 w-4 fill-primary stroke-white" />
                  Creatives
                </DropdownMenuItem>
              </Link>
              <Link href="/leaderboard/redFlames">
                <DropdownMenuItem className="flex items-center gap-2">
                  <FlameIcon className="h-4 w-4 fill-red-600 stroke-white" />
                  Drops
                </DropdownMenuItem>
              </Link>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        {!isNotCurrentUser && (
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
