"use client";
import { User } from "@/lib/types/types";
import ProfileCard from "./profile-card";

interface ProfileListProps {
  profiles: User[];
}

const ProfileList = ({ profiles }: ProfileListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-auto h-[500px]">
      {profiles.map((profile, index) => (
        <ProfileCard key={index} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileList;
