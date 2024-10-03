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
import { useState, useMemo } from "react";
import {
  addMonths,
  eachDayOfInterval,
  format,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  subDays,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeatMapDataPoint } from "@/lib/types/types";

const getColor = (count: number) => {
  if (count === 0) return "bg-muted";
  if (count <= 1) return "bg-yellow-200";
  if (count <= 3) return "bg-yellow-400";
  return "bg-yellow-600";
};

interface ProgressTrackerProps {
  data: HeatMapDataPoint[];
}
export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ data }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });

    // Find the day of the week for the first day of the month
    const startDayOfWeek = start.getDay();

    // Pad with previous month days
    const paddedDays = [];

    // Add days from the previous month to fill the week
    for (let i = startDayOfWeek; i > 0; i--) {
      const prevDay = subDays(start, i);
      paddedDays.push(prevDay);
    }

    return [...paddedDays, ...days];
  }, [currentMonth]);

  const activityMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((item) => {
      map.set(item.date, item.count);
    });
    return map;
  }, [data]);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => addMonths(prev, direction === "prev" ? -1 : 1));
  };

  const HeatMapCalender = () => {
    return (
      <>
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
          {daysInMonth.map((day) => {
            const dateString = format(day, "yyyy-MM-dd");
            const count = activityMap.get(dateString) || 0;
            return (
              <div
                key={dateString}
                className={`aspect-square flex items-center justify-center rounded-md ${
                  isSameMonth(day, currentMonth)
                    ? getColor(count)
                    : "bg-gray-400"
                }`}
              >
                <span
                  className={`text-xs ${
                    count > 0 ? "text-white" : "text-gray-700"
                  }`}
                >
                  {format(day, "d")}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          {[0, 1, 3, 5].map((level) => (
            <div key={level} className="flex items-center">
              <div
                className={`w-4 h-4 rounded-sm ${getColor(level)} mr-1`}
              ></div>
              <span className="text-xs text-gray-600">
                {level === 0 ? "No drops" : `${level}+ drops`}
              </span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const PreviousBtn = () => {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigateMonth("prev")}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous month</span>
      </Button>
    );
  };

  const NextBtn = () => {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigateMonth("next")}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next month</span>
      </Button>
    );
  };
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
          <DialogContent className="p-9 md:rounded-lg">
            <DialogHeader className="flex items-center justify-between space-y-4">
              <DialogTitle>Progress Tracker</DialogTitle>
              <div className="flex items-center space-x-2">
                <PreviousBtn />
                <DialogDescription>
                  {format(currentMonth, "MMMM yyyy")}
                </DialogDescription>
                <NextBtn />
              </div>
            </DialogHeader>
            <HeatMapCalender />
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
          <DrawerContent className="sm:max-w-[425px] p-2">
            <DrawerHeader className="flex items-center justify-between">
              <DrawerTitle className="">Progress Tracker</DrawerTitle>
              <div className="flex items-center space-x-2">
                <PreviousBtn />
                <DrawerDescription>
                  {format(currentMonth, "MMMM yyyy")}
                </DrawerDescription>
                <NextBtn />
              </div>
            </DrawerHeader>
            <HeatMapCalender />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
