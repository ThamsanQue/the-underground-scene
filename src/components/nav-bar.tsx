"use client";

import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { SocialLinks } from "./socialIcons";
import Image from "next/image";
import TUS from "../assets/icons/tus2.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import MagicLinkSignIn from "./sign-in";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { placeholderImage } from "@/lib/utils";

export default function NavBar() {
  const user = useCurrentUser();
  const AuthButton = () => {
    if (user && user?.id) {
      return (
        <Link href={`/dashboard/${user?.id}`}>
          <Avatar className="w-9 h-9 md:w-10 md:h-10 border-2 border-primary cursor-pointer hover:border-blue-500 transition duration-300 ease-in-out">
            <AvatarImage src={user?.image || placeholderImage} />
            <AvatarFallback>{user?.email?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
        </Link>
      );
    }

    return <MagicLinkSignIn />;
  };

  return (
    <header className="flex h-20 w-full shrink-0 items-center justify-center px-4 md:px-6">
      <div className="flex items-center mt-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold"
          prefetch={false}
        >
          <Image src={TUS} alt="TUS Logo" width={30} height={30} />
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <SocialLinks />
        <ModeToggle />
        <AuthButton />
      </div>
    </header>
  );
}
