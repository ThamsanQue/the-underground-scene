"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useMediaQuery from "@/hooks/useMediaQuery";

export const CreateDrop = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {isDesktop ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Drop</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Drop</DialogTitle>
              <DialogDescription>
                Consistency is the key to pushing out work that stands the test
                of time.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div>
                <Label htmlFor="username" className="text-right">
                  Link
                </Label>
                <Input
                  id="username"
                  placeholder="Enter the link to your drop"
                  className="col-span-3"
                  type="url"
                />
              </div>
              <div>
                <Label htmlFor="title" className="text-right">
                  Description
                </Label>
                <Textarea placeholder="Tell the people what the drop is about" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Drop</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Create Drop</Button>
          </DrawerTrigger>
          <DrawerContent className="sm:max-w-[600px]">
            <DrawerHeader>
              <DrawerTitle>Create Drop</DrawerTitle>
              <DrawerDescription>
                Consistency is the key to pushing out work that stands the test
                of time.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-6 p-6">
              <div>
                <Label htmlFor="username" className="text-right">
                  Link
                </Label>
                <Input
                  id="username"
                  placeholder="Enter the link to your drop"
                  className="col-span-3"
                  type="url"
                />
              </div>
              <div>
                <Label htmlFor="title" className="text-right">
                  Description
                </Label>
                <Textarea placeholder="Tell the people what the drop is about" />
              </div>
            </div>
            <DrawerFooter>
              <Button type="submit">Drop</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
