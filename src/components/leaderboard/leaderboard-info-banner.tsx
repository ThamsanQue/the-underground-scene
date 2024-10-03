"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FlameIcon, X } from "lucide-react";

export default function LeaderboardInfoBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-primary text-accent-foreground dark:text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="LeaderBoard Info Banner"
      >
        ?
      </button>
      {isOpen && (
        <div className="absolute bottom-12 left-0 w-64 bg-background border border-border rounded-lg shadow-lg p-4 animate-in slide-in-from-bottom-2">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-semibold">Leaderboard Info</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="-mt-1 -mr-1"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            The first Artist to reach 100 drops will start the leaderboard. This
            Artist will be crowned the{" "}
            <span className="font-bold text-primary">
              Icon of The Underground Scene
            </span>
            , until another Artist surpasses them.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            The leaderboard is designed to promote dedicated Artists who are
            serious about their craft and eager to share their work with the
            world. We don&apos;t rely on algorithms to rank Artists; instead, we
            focus solely on the total number of drops by each Artist. Their
            effort and commitment are what truly determine their ranking.
          </p>
          <div className="flex">
            <FlameIcon className="h-8 w-8 mr-2 fill-primary stroke-black dark:stroke-white" />
            <p className="text-sm text-muted-foreground mb-4">
              Yellow Flames indicate the total number of drops by an Artist.
            </p>
          </div>
          <div className="flex">
            <FlameIcon className="h-10 w-10 mr-2 text-primary stroke-black dark:stroke-white fill-red-600" />
            <p className="text-sm text-muted-foreground mb-4">
              Red Flames represent the total likes received for an Artist&apos;s
              individual drop.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
