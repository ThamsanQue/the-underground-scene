"use client";
import ProfileCard from "./profile-card";

const ProfileList = ({ profiles }) => {
  console.log(profiles);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-auto h-[500px]">
      {profiles.map((profile, index) => (
        <ProfileCard key={index} profile={profile} />
      ))}
    </div>
  );
};

export default ProfileList;
