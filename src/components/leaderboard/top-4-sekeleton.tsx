"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Top4Skeleton() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 overflow-y-auto max-h-[500px]">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg border dark:border-white/10 border-gray-200 aspect-[3/4]"
        >
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full dark:bg-white/15 bg-gray-200" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px] dark:bg-white/15 bg-gray-200" />
                <Skeleton className="h-3 w-[100px] dark:bg-white/15 bg-gray-200" />
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex items-center space-x-1">
                <Skeleton className="h-4 w-4 dark:bg-white/15 bg-gray-200" />
                <Skeleton className="h-3 w-[60px] dark:bg-white/15 bg-gray-200" />
              </div>
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-6 w-6 rounded-full dark:bg-white/15 bg-gray-200"
                  />
                ))}
              </div>
            </div>
          </div>
          <Skeleton className="absolute inset-0 -z-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="dark:text-white/15 font-semibold text-lg text-gray-300">
              Reserved for Top 4 Artists
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
