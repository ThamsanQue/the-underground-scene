// pages/index.js
import Image from "next/image";
import { Crown } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { FlameIcon } from "lucide-react";
import Link from "next/link";
import { SocialIcons } from "../socialIcons";
import { LeadderboardProfiles } from "../Profiles/leaderboard-profiles";

const TopArtists = () => {
  const artists = [
    {
      id: 2,
      name: "Ruben",
      title: "Rapper",
      flames: 80,
      avatar:
        "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100278.jpg?size=626&ext=jpg&ga=GA1.1.1170908441.1717942768&semt=sph",
    },
    {
      id: 3,
      name: "James",
      title: "Tattoo Artist",
      flames: 76,
      avatar:
        "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg",
    },
    {
      id: 4,
      name: "Lincoln",
      title: "Graphic Designer",
      flames: 72,
      avatar:
        "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg",
    },
    {
      id: 5,
      name: "Jakob",
      title: "Graffiti Artist",
      flames: 68,
      avatar:
        "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg",
    },
    {
      id: 6,
      name: "Madelyn",
      title: "Creative Director",
      flames: 64,
      avatar:
        "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg",
    },
  ];
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

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-lg md:text-xl font-bold">Creatives</h1>
        <nav className="text-sm md:text-lg">
          <ul className="flex space-x-4">
            <li>
              <span className="text-gray-300 flex ">
                <FlameIcon className="mr-2 fill-primary stroke-white" /> Flames
              </span>
            </li>
            <li>
              <Link
                href="/leaderboard/redFlames"
                className="text-gray-700 flex"
              >
                <FlameIcon className="mr-2 fill-red-600 stroke-white" /> Flames
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="relative text-center mb-8">
        <div className="relative inline-block">
          <Avatar className=" w-24 h-24">
            <Image
              src="https://img.freepik.com/free-photo/3d-illustration-young-man-with-beard-mustache_1142-51070.jpg"
              alt="Alfredo Siphron"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Avatar>
          <Crown className="absolute top-0 right-0 w-7 h-7 text-primary bg-background rounded-full p-1" />
        </div>
        <div className="mt-4">
          <span className="p-2 font-semibold text-primary mt-4 bg-secondary dark:bg-secondary/30 rounded-md">
            Creative Director
          </span>
        </div>
        <h2 className="text-xl font-semibold mt-4">@Alfredo Siphron</h2>
        <span className="text-gray-300 font-semibold dark:text-gray-700">
          The Icon Living
        </span>

        <div className="flex flex-col items-center justify-center  mt-4 ">
          <div className="flex gap-4 mb-4">
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
          <div className=" flex gap-4">
            <div className="flex items-center gap-1">
              <FlameIcon className="w-5 h-5 fill-primary stroke-white inline-block stroke-2 animate-pulse" />
              <p className="text-primary font-semibold animate-pulse">10k</p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-y-auto h-[400px] custom-scrollbar">
        <div className="space-y-4">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="flex justify-between items-center p-4 dark:bg-secondary/30 bg-secondary rounded-lg mb-2"
            >
              <span className="font-bold">{artist.id}</span>
              <LeadderboardProfiles />
              <span className="flex-grow ml-4 text-sm md:text-md">
                @{artist.name}
              </span>
              <span className="flex-grow justify-center text-sm md:text-md text-muted-foreground font-semibold">
                {artist.title}
              </span>
              <FlameIcon className="w-4 h-4 md:w-5 md:h-5 fill-primary stroke-white inline-block stroke-2 mr-1" />
              <span className="text-primary text-sm md:text-md">
                {artist.flames}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopArtists;
