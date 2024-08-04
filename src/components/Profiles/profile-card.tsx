"use client";

import Link from "next/link";
import { Card } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { FlameIcon } from "lucide-react";
import { SocialIcons } from "../socialIcons";

const ProfileCard = ({ profile }) => {
  const { name, title, avatar, socialLinks, likes, artcover } = profile;

  return (
    <Card className="relative h-[400px] w-[300px] overflow-hidden rounded-lg shadow-lg">
      <img
        src={artcover}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex items-center gap-4">
          <Avatar className="border-2 border-primary cursor-pointer hover:border-blue-500 transition duration-300 ease-in-out">
            <Link href="/dashboard">
              <img src={avatar} alt="Avatar" />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Link>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="text-sm font-medium text-gray-300">{title}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FlameIcon className="h-5 w-5 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-300">{likes}</span>
          </div>
          <div className="flex gap-2">
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
        </div>
      </div>
    </Card>
  );
};
export default ProfileCard;
const AvatarFallback = ({ children }) => {
  return (
    <div className="flex items-center justify-center text-white">
      {children}
    </div>
  );
};
