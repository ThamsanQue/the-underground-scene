"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Goal } from "lucide-react";
import useMediaQuery from "@/hooks/useMediaQuery";

export const ProgressTracker = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className="w-full max-w-2xl">
      {isDesktop ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Progress
              <Goal className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 md:rounded-lg">
            <DialogHeader className="p-6">
              <DialogTitle className="flex items-center">
                Progress Tracker
              </DialogTitle>
              <DialogDescription>
                {" "}
                View your daily progress and activity over time.
              </DialogDescription>
            </DialogHeader>
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-full ${
                      i % 5 === 0
                        ? "bg-primary"
                        : i % 3 === 0
                        ? "bg-secondary"
                        : "bg-muted"
                    }`}
                  >
                    <FlameIcon className="w-5 h-5 text-primary-foreground" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <Button variant="ghost" size="icon">
                  <ChevronLeftIcon className="w-5 h-5" />
                </Button>
                <div className="text-sm font-medium">April 2023</div>
                <Button variant="ghost" size="icon">
                  <ChevronRightIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              View Progress
              <Goal className="ml-2 h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="sm:max-w-[425px]">
            <DrawerHeader>
              <DrawerTitle className="">Progress Tracker</DrawerTitle>
              <DrawerDescription>
                View your daily progress and activity over time.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-full ${
                      i % 5 === 0
                        ? "bg-primary"
                        : i % 3 === 0
                        ? "bg-secondary"
                        : "bg-muted"
                    }`}
                  >
                    <FlameIcon className="w-5 h-5 text-primary-foreground" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <Button variant="ghost" size="icon">
                  <ChevronLeftIcon className="w-5 h-5" />
                </Button>
                <div className="text-sm font-medium">April 2023</div>
                <Button variant="ghost" size="icon">
                  <ChevronRightIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function FlameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
