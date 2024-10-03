import { Skeleton } from "@/components/ui/skeleton";
import { Crown, Instagram, Youtube } from "lucide-react";

export default function Top1Skeleton() {
  return (
    <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden mb-4">
      <div className="p-6 space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <Skeleton className="h-24 w-24 rounded-full bg-gray-200 dark:bg-secondary/50" />
            <div className="absolute top-0 right-0 bg-primary rounded-full p-1">
              <Crown className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-4 w-32secondary/50" />
          <Skeleton className="h-6 w-48 mx-auto bg-gray-200 dark:bg-secondary/50" />
          <Skeleton className="h-4 w-40 mx-auto bg-gray-200 dark:bg-secondary/50" />
        </div>
        <div className="flex justify-center space-x-4">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-secondary/50" />
          <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-secondary/50" />
          <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-secondary/50" />
        </div>
        <div className="flex justify-center items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
              clipRule="evenodd"
            />
          </svg>
          <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-secondary/50" />
        </div>
      </div>
    </div>
  );
}
