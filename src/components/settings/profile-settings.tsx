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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useMediaQuery from "@/hooks/useMediaQuery";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";
import FileUpload, {
  DataFromFileUpload,
  ModalTrigger,
} from "../Profiles/file-uploads";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { updateArtistProfile } from "@/server-actions/artist-profile";
import { toast } from "sonner";
import useArtistStore from "@/zustand/useArtistStore";
import ACF from "../../assets/icons/artcoverfallback.png";
import { placeholderImage } from "@/lib/utils";

const socialLinkSchema = z.object({
  id: z.string(),
  value: z.string().min(1, {
    message: "Social link value is required.",
  }),
});

const formSchema = z.object({
  name: z.string().min(1, {
    message: "username is required, so that people know your by stage name",
  }),
  title: z.string().min(1, {
    message: "Title is required, so that Agencies can find you better",
  }),
  country: z.string().min(1, {
    message: "Country is required, so that Agencies know where your're based",
  }),
  image: z.string().min(1, { message: "Profile picture is required" }),
  artcover: z.string().min(1, {
    message: "Art cover is required, for flexing your profile better",
  }),
  socialLinks: z.array(socialLinkSchema).min(1, {
    message:
      "At least one of your socials is required for agencies to see your profile",
  }),
});

interface ProfileSettingsProps {
  userId: string | undefined;
}

// export type FileUploadSchema = z.infer<typeof fileUploadSchema>;
export const ProfileSettings = ({ userId }: ProfileSettingsProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // const { inputs, addInput, removeInput } = useInputManager();
  const [isPending, startTransition] = useTransition();
  const [modalState, setModalState] = useState<ModalTrigger>({
    isOpen: false,
    triggerId: null,
  });
  const artistProfile = useArtistStore((state) => state.artistProfile);
  const onModalTriggerChange = (id: "image" | "artCover") => {
    setModalState({ isOpen: true, triggerId: id });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      country: "",
      image: "",
      artcover: "",
      socialLinks: [{ id: Date.now().toString(), value: "" }],
    },
  });

  const dataFromFileUpload: DataFromFileUpload = (data) => {
    if (data.modalTriggerFromUppy === false) {
      setModalState({ isOpen: false, triggerId: null });
    }

    if (data.image || data.artCover) {
      if (data.image) {
        form.setValue("image", data.image);
        toast.info("Profile picture will appear after saving changes", {
          position: isDesktop ? "bottom-right" : "top-center",
        });
      }

      if (data.artCover) {
        form.setValue("artcover", data.artCover);
        toast.info("Art cover will appear after saving changes", {
          position: isDesktop ? "bottom-right" : "top-center",
        });
      }
    }
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    const validatedValues = formSchema.parse(values);

    const payload = {
      userId,
      ...validatedValues,
      socialLinks: validatedValues.socialLinks?.map((link) => link.value),
    };

    startTransition(() => {
      updateArtistProfile(payload)
        .then((res) => {
          if (res.error) {
            toast.error(res.error, {
              position: isDesktop ? "bottom-right" : "top-center",
            });
          }
          if (res.success) {
            toast.success(res.success, {
              position: isDesktop ? "bottom-right" : "top-center",
            });
          }
        })
        .catch((err) => {
          console.error(err, "err");
          toast.error("Something went wrong", {
            position: isDesktop ? "bottom-right" : "top-center",
          });
        });
    });
  }

  useEffect(() => {
    if (artistProfile) {
      const transformedSocialLinks = artistProfile?.socialLinks?.map(
        (link) => ({
          id: link?.id,
          value: link?.link,
        })
      );
      form.reset({
        name: artistProfile?.name || "",
        title: artistProfile?.title || "",
        country: artistProfile?.country || "",
        image: artistProfile?.image || "",
        artcover: artistProfile?.artcover || "",
        socialLinks:
          transformedSocialLinks?.length > 0
            ? transformedSocialLinks
            : [{ id: Date.now().toString(), value: "" }],
      });
    }
  }, [form, artistProfile]);

  const ProfileForm = () => {
    return (
      <div className={`grid gap-6 py-6 m-4`}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="profile-form">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      className="col-span-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-right">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Artsit, Fashion Designer, etc."
                      {...field}
                      className="col-span-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-right">Country</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your country"
                      className="col-span-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4 md:mx-auto ml-4 my-4">
              <div className={`relative inline-block mx-auto `}>
                <Avatar className={`${isDesktop ? "w-16 h-16" : "w-14 h-14"}`}>
                  <AvatarImage src={artistProfile?.image || placeholderImage} />
                  <AvatarFallback>{artistProfile?.name || "?"}</AvatarFallback>
                </Avatar>
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                  onClick={() => onModalTriggerChange("image")}
                >
                  <span className="text-white text-xs font-semibold cursor-pointer">
                    Change
                  </span>
                </div>
              </div>
              <span className="text-white/50 font-semibold text-center text-sm">
                Profile Picture
              </span>
              <div className={`relative inline-block`}>
                <Image
                  src={artistProfile?.artcover || ACF}
                  width={180}
                  height={90}
                  alt="Artcover"
                  className="aspect-[2/1] overflow-hidden rounded-lg object-cover object-center"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                  onClick={() => onModalTriggerChange("artCover")}
                >
                  <span className="text-white text-sm font-semibold cursor-pointer">
                    Change
                  </span>
                </div>
              </div>
              <span className=" text-white/50 font-semibold text-center">
                Art Cover
              </span>
              <FileUpload
                modalTrigger={modalState}
                dataFromFileUpload={dataFromFileUpload}
              />
            </div>
            <FormField
              control={form.control}
              name="socialLinks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right mt-3">
                    Social Links
                  </FormLabel>
                  <div className="col-span-3 grid gap-4">
                    {field.value &&
                      field.value.map((link, index) => (
                        <div key={link.id} className="flex items-center">
                          <FormControl>
                            <Input
                              placeholder="Add links to your work!"
                              value={link.value}
                              onChange={(e) => {
                                const newLinks = [...(field.value || [])];
                                newLinks[index] = {
                                  ...newLinks[index],
                                  value: e.target.value,
                                };
                                field.onChange(newLinks);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                          {field.value && field.value.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => {
                                const newLinks = (field.value || []).filter(
                                  (_, i) => i !== index
                                );
                                field.onChange(newLinks);
                              }}
                              variant={"outline"}
                              size={"icon"}
                              className="ml-2"
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    <Button
                      type="button"
                      onClick={() => {
                        const newLink = {
                          id: Date.now().toString(),
                          value: "",
                        };
                        field.onChange([...(field.value || []), newLink]);
                      }}
                      variant={"outline"}
                      className="mt-2 mx-auto w-full"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  };

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
            <ProfileForm />
            <DialogFooter>
              <Button
                type="submit"
                variant="default"
                form="profile-form"
                disabled={isPending}
              >
                Save Changes
              </Button>
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
            <ProfileForm />
            <DrawerFooter>
              <Button type="submit" form="profile-form">
                Save Changes
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
