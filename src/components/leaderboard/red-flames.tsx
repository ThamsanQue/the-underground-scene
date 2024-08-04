"use client";

import { FlameIcon } from "lucide-react";
import { Card } from "../ui/card";
import { FaSoundcloud } from "react-icons/fa";
import { LeadderboardProfiles } from "../Profiles/leaderboard-profiles";
import { Button } from "../ui/button";
import Link from "next/link";

const artists = [
  {
    id: 1,
    description:
      "In this post, I'll walk you through the process of building a serverless API using AWS Lambda and API Gateway.",
    flames: 68,
    avatar:
      "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg",
  },
  {
    id: 2,
    description:
      "In this post, I'll walk you through the process of building a serverless API using AWS Lambda and API Gateway.",
    flames: 68,
    avatar:
      "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg",
  },
  {
    id: 3,
    description:
      "In this post, I'll walk you through the process of building a serverless API using AWS Lambda and API Gateway.",
    flames: 68,
    avatar:
      "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg",
  },
  {
    id: 4,
    description:
      "In this post, I'll walk you through the process of building a serverless API using AWS Lambda and API Gateway.",
    flames: 68,
    avatar:
      "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg",
  },
  {
    id: 5,
    description:
      "In this post, I'll walk you through the process of building a serverless API using AWS Lambda and API Gateway.",
    flames: 68,
    avatar:
      "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg",
  },
];

const RedFlames = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-lg md:text-xl font-bold">Drops</h1>
        <nav className="text-sm md:text-lg">
          <ul className="flex space-x-4">
            <li>
              <Link href="/leaderboard" className="text-gray-700 flex ">
                <FlameIcon className="mr-2 fill-primary stroke-white" /> Flames
              </Link>
            </li>
            <li>
              <span className="text-gray-300 flex">
                <FlameIcon className="mr-2 fill-red-600 stroke-white" /> Flames
              </span>
            </li>
          </ul>
        </nav>
      </header>

      <section className="overflow-y-auto h-[750px] custom-scrollbar">
        <div className="space-y-4">
          {artists.map((artist) => (
            <Card className="flex flex-col gap-4 p-4" key={artist.id}>
              <div className="flex items-center gap-1">
                <span>{artist.id}</span>
                <LeadderboardProfiles />
                <span className="ml-2">@Alexandra</span>
              </div>
              <div className="flex flex-col gap-2 items-start ml-4">
                <p className="text-muted-foreground">{artist.description}</p>
                <Button variant="outline" size="icon" className="self-end">
                  <FaSoundcloud className="h-5 w-5 fill-primary stroke-white" />
                </Button>
              </div>

              <div className="text-xs text-muted-foreground flex justify-between items-center mt-4 ml-4">
                <time dateTime="2023-06-15">June 15, 2023</time>
                <span className="flex items-center font-semibold text-md ">
                  <FlameIcon className="h-6 w-6   mr-2" />
                  {artist.flames}{" "}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RedFlames;
