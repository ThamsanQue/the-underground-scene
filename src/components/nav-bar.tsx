"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { signIn } from "next-auth/react";
import { SocialLinks } from "./socialIcons";
import Image from "next/image";
import TUS from "../assets/icons/tus2.svg";

export default function NavBar() {
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
        <Button
          variant="default"
          className="inline-flex h-9 items-center justify-center rounded-md bg-[#ffa600] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#ffc14d] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ffe4b3] disabled:pointer-events-none disabled:opacity-50 text-secondary"
          onClick={() => signIn()}
        >
          Join Now
        </Button>
      </div>
    </header>
  );
}
