"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FlameIcon, Goal } from "lucide-react";
import { ProgressTracker } from "../progress-tracker";
import { FaInstagram, FaSoundcloud, FaTiktok, FaYoutube } from "react-icons/fa";
import { ProfileMenu } from "../settings/profile-menu";
import { ProfileSettings } from "../settings/profile-settings";
import { CreateDrop } from "./drops/create-drop";

export const UserProfile = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="relative">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoverartworks.com%2Fwp-content%2Fuploads%2F2020%2F06%2FUNTITLED_2_Preview.jpg&f=1&nofb=1&ipt=559686d51447b2e5b87fc6721444349d4ef8da36cbc0ccd87df08b8602a4e940&ipo=images"
          width={1920}
          height={480}
          alt="Artcover"
          className="w-full h-[240px] md:h-[480px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-[-50px]   md:bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
            <ProfileMenu />
            <div className="space-y-1 flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold md:text-3xl">Cody Newman</h1>
              <p className="text-sm text-muted-foreground md:text-base">
                Software Engineer
              </p>
            </div>
            <div>
              <div className="flex gap-2">
                <ProfileSettings />
                <CreateDrop />
              </div>
              <div className="flex flex-col items-center gap-2 mt-4">
                <ProgressTracker />
                <div className="text-sm flex space-x-1 text-primary">
                  <FlameIcon className="h-4 w-4 mr-1 fill-primary stroke-white" />{" "}
                  Flame:
                  <span className="font-bold">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-240px)]">
        <div className="container px-4 md:px-6 py-8 md:py-12 mt-8 md:mt-0">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col gap-4 p-4">
              <p className="text-muted-foreground">
                In this post, I'll walk you through the process of building a
                serverless API using AWS Lambda and API Gateway.
              </p>
              <div className="text-xs text-muted-foreground flex justify-between items-center">
                <time dateTime="2023-06-15">June 15, 2023</time>
                <span className="flex items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                  <FaSoundcloud className="h-5 w-5 mr-2 fill-primary stroke-white" />
                  Soundcloud
                </span>
                <span className="flex items-center">
                  10{" "}
                  <FlameIcon className="h-5 w-5 ml-2 fill-red-600 stroke-white" />{" "}
                </span>
              </div>
            </Card>
            <Card className="flex flex-col gap-4 p-4">
              <p className="text-muted-foreground">
                Dive deep into the world of React Hooks and learn how to
                effectively use them in your applications.
              </p>
              <div className="text-xs text-muted-foreground flex justify-between items-center">
                <time dateTime="2023-05-20">May 20, 2023</time>
                <span className="flex items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                  <FaYoutube className="h-5 w-5 mr-2 fill-primary stroke-white" />
                  Youtube
                </span>
                <span className="flex items-center">
                  10{" "}
                  <FlameIcon className="h-5 w-5 ml-2 fill-red-600 stroke-white" />{" "}
                </span>
              </div>
            </Card>
            <Card className="flex flex-col gap-4 p-4">
              <p className="text-muted-foreground">
                Learn techniques to improve the performance of your database
                queries and ensure your application is lightning fast.
              </p>
              <div className="text-xs text-muted-foreground flex justify-between items-center">
                <time dateTime="2023-04-01">April 1, 2023</time>
                <span className="flex items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                  <FaInstagram className="h-5 w-5 mr-2 fill-primary stroke-white" />
                  Instagram
                </span>
                <span className="flex items-center">
                  10{" "}
                  <FlameIcon className="h-5 w-5 ml-2 fill-red-600 stroke-white" />{" "}
                </span>
              </div>
            </Card>
            <Card className="flex flex-col gap-4 p-4">
              <p className="text-muted-foreground">
                In this tutorial, I'll show you how to deploy a React
                application to AWS Amplify, a powerful hosting and CI/CD
                service.
              </p>
              <div className="text-xs text-muted-foreground flex justify-between items-center">
                <time dateTime="2023-03-15">March 15, 2023</time>
                <span className="flex items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                  <FaTiktok className="h-5 w-5 mr-2 fill-primary stroke-white" />
                  Tiktok
                </span>
                <span className="flex items-center">
                  10{" "}
                  <FlameIcon className="h-5 w-5 ml-2 fill-red-600 stroke-white" />{" "}
                </span>
              </div>
            </Card>
            <Card className="flex flex-col gap-4 p-4">
              <p className="text-muted-foreground">
                Discover techniques to improve the performance of your React
                components and ensure your application is blazing fast.
              </p>
              <div className="text-xs text-muted-foreground flex justify-between items-center">
                <time dateTime="2023-02-01">February 1, 2023</time>
                <span className="flex items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                  <FaYoutube className="h-5 w-5 mr-2 fill-primary stroke-white" />
                  Youtube
                </span>
                <span className="flex items-center">
                  10{" "}
                  <FlameIcon className="h-5 w-5 ml-2 fill-red-600 stroke-white" />{" "}
                </span>
              </div>
            </Card>
            <Card className="flex flex-col gap-4 p-4">
              <p className="text-muted-foreground">
                Learn how to create UI components that are accessible to users
                with disabilities, ensuring an inclusive experience.
              </p>
              <div className="text-xs text-muted-foreground flex justify-between items-center">
                <time dateTime="2023-01-01">January 1, 2023</time>
                <span className="flex items-center border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                  <FaSoundcloud className="h-5 w-5 mr-2 fill-primary stroke-white" />
                  Soundcloud
                </span>
                <span className="flex items-center">
                  10{" "}
                  <FlameIcon className="h-5 w-5 ml-2 fill-red-600 stroke-white" />{" "}
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
