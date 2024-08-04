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

export const ProfileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-16 h-16 md:w-24 md:h-24 border-2 border-primary cursor-pointer hover:border-blue-500 transition duration-300 ease-in-out">
          <AvatarImage src="https://img.freepik.com/free-photo/3d-illustration-young-man-with-beard-mustache_1142-51070.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <Link href="/" className="flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FlameIcon className="h-4 w-4 mr-2" />
            Flames
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Link href="/leaderboard" className="flex items-center gap-2">
                  <FlameIcon className="h-4 w-4 fill-primary stroke-white" />
                  Creatives
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/leaderboard/redFlames"
                  className="flex items-center gap-2"
                >
                  <FlameIcon className="h-4 w-4 fill-red-600 stroke-white" />
                  Drops
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="#" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
