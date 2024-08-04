"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useMediaQuery from "@/hooks/useMediaQuery";

export const ProfileSettings = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <>
      {isDesktop ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Account Settings</DialogTitle>
              <DialogDescription>
                Customize your account settings here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter your title"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="avatar" className="text-right">
                  Avatar
                </Label>
                <div className="col-span-3 flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://img.freepik.com/free-photo/3d-illustration-young-man-with-beard-mustache_1142-51070.jpg" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <Input id="avatar" type="file" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="artcover" className="text-right">
                  Artcover
                </Label>
                <div className="col-span-3 flex items-center gap-4">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoverartworks.com%2Fwp-content%2Fuploads%2F2020%2F06%2FUNTITLED_2_Preview.jpg&f=1&nofb=1&ipt=559686d51447b2e5b87fc6721444349d4ef8da36cbc0ccd87df08b8602a4e940&ipo=images"
                    width="180"
                    height="90"
                    alt="Artcover"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-cover object-center"
                  />
                  <Input id="artcover" type="file" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="social" className="text-right">
                  Social Links
                </Label>
                <div className="col-span-3 grid gap-4">
                  <Input id="social-twitter" placeholder="Twitter" />
                  <Input id="social-linkedin" placeholder="LinkedIn" />
                  <Input id="social-github" placeholder="GitHub" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DrawerTrigger>
          <DrawerContent className="sm:max-w-[600px]">
            <DrawerHeader>
              <DrawerTitle>Account Settings</DrawerTitle>
              <DrawerDescription>
                Customize your account settings here.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-6 p-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter your title"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="avatar" className="text-right">
                  Avatar
                </Label>
                <div className="col-span-3 flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://img.freepik.com/free-photo/3d-illustration-young-man-with-beard-mustache_1142-51070.jpg" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <Input id="avatar" type="file" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="artcover" className="text-right">
                  Artcover
                </Label>
                <div className="col-span-3 flex items-center gap-4">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoverartworks.com%2Fwp-content%2Fuploads%2F2020%2F06%2FUNTITLED_2_Preview.jpg&f=1&nofb=1&ipt=559686d51447b2e5b87fc6721444349d4ef8da36cbc0ccd87df08b8602a4e940&ipo=images"
                    width="180"
                    height="90"
                    alt="Artcover"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-cover object-center"
                  />
                  <Input id="artcover" type="file" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="social" className="text-right">
                  Social Links
                </Label>
                <div className="col-span-3 grid gap-4">
                  <Input id="social-twitter" placeholder="Twitter" />
                  <Input id="social-linkedin" placeholder="LinkedIn" />
                  <Input id="social-github" placeholder="GitHub" />
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button type="submit">Save Changes</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
