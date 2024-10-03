import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { DropLink, HeatMapDataObject, HeatMapDataPoint } from "./types/types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genId(pfx: string) {
  const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);
  return [pfx, nanoid()].join("_");
}

// dateUtils.ts
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

export const getPlatformFromLink = (link: string) => {
  if (link.includes("soundcloud.com")) return "soundcloud";
  if (link.includes("instagram.com")) return "instagram";
  if (link.includes("whatsapp.com")) return "whatsapp";
  if (link.includes("tiktok.com")) return "tiktok";
  if (link.includes("youtube.com")) return "youtube";
  return null;
};

export const createHeatMapData = (
  dropLinks: DropLink[]
): HeatMapDataPoint[] => {
  const heatMapData: HeatMapDataObject = {};

  dropLinks?.forEach((link) => {
    const date = link.postedAt.toISOString().split("T")[0]; // Get YYYY-MM-DD format
    if (heatMapData[date]) {
      heatMapData[date]++;
    } else {
      heatMapData[date] = 1;
    }
  });

  return Object.entries(heatMapData).map(([date, count]) => ({ date, count }));
};

export const placeholderImage =
  "https://images.pexels.com/photos/5605060/pexels-photo-5605060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
