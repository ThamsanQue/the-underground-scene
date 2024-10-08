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
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Disc3, MinusCircle, PlusCircle } from "lucide-react";
import FileUpload, {
  DataFromFileUpload,
  ModalTrigger,
} from "../Profiles/file-uploads";
import Image from "next/image";
import { useFieldArray, UseFieldArrayAppend, useForm } from "react-hook-form";
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

type FormValues = z.infer<typeof formSchema>;
interface ProfileSettingsProps {
  userId: string | undefined;
}

interface ProfileFormProps {
  form: ReturnType<typeof useForm<FormValues>>;
  fields: ReturnType<typeof useFieldArray>["fields"];
  append: UseFieldArrayAppend<FormValues, "socialLinks">;
  remove: ReturnType<typeof useFieldArray>["remove"];
  isDesktop: boolean;
  onModalTriggerChange: (type: "image" | "artCover") => void;
  dataFromFileUpload: DataFromFileUpload;
  modalTrigger: ModalTrigger;
}

const ProfileForm = memo(
  ({
    form,
    fields,
    append,
    remove,
    isDesktop,
    onModalTriggerChange,
    dataFromFileUpload,
    modalTrigger,
  }: ProfileFormProps) => {
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleFocus = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement
        ) {
          setTimeout(() => {
            const rect = target.getBoundingClientRect();
            const isVisible =
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
              rect.right <=
                (window.innerWidth || document.documentElement.clientWidth);

            if (!isVisible) {
              target.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 100);
        }
      };

      const formElement = formRef.current;
      if (formElement) {
        formElement.addEventListener("focus", handleFocus, true);
      }

      return () => {
        if (formElement) {
          formElement.removeEventListener("focus", handleFocus, true);
        }
      };
    }, []);
    return (
      <div
        ref={formRef}
        className={`grid gap-6 py-6 m-4 overflow-y-auto max-h-[calc(100vh-120px)]`}
      >
        <Form {...form}>
          <form>
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
                  <AvatarImage src={form.watch("image") || placeholderImage} />
                  <AvatarFallback>{"?"}</AvatarFallback>
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
                  src={form.watch("artcover") || ACF}
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
                modalTrigger={modalTrigger}
                dataFromFileUpload={dataFromFileUpload}
              />
            </div>
            <div>
              <FormLabel className="mb-2 block">Social Links</FormLabel>
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`socialLinks.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex items-center mb-2">
                      <FormControl>
                        <Input
                          placeholder="Add links to your work!"
                          {...field}
                        />
                      </FormControl>
                      {index > 0 && (
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="outline"
                          size="icon"
                          className="ml-2"
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                onClick={() => append({ id: Date.now().toString(), value: "" })}
                variant="outline"
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Social Link
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }
);

ProfileForm.displayName = "ProfileForm";

export const ProfileSettings = ({ userId }: ProfileSettingsProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [modalState, setModalState] = useState<ModalTrigger>({
    isOpen: false,
    triggerId: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const artistProfile = useArtistStore((state) => state.artistProfile);
  const onModalTriggerChange = (id: "image" | "artCover") => {
    setModalState({ isOpen: true, triggerId: id });
  };

  const defaultValues: FormValues = useMemo(
    () => ({
      name: artistProfile?.name || "",
      title: artistProfile?.title || "",
      country: artistProfile?.country || "",
      image: artistProfile?.image || "",
      artcover: artistProfile?.artcover || "",
      socialLinks: artistProfile?.socialLinks?.map((link) => ({
        id: link.id,
        value: link.link,
      })) || [{ id: Date.now().toString(), value: "" }],
    }),
    [artistProfile]
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
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
  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        setIsLoading(true);
        const res = await updateArtistProfile({
          userId,
          ...values,
          socialLinks: values.socialLinks.map((link) => link.value),
        });
        if (res.error) {
          setIsLoading(false);
          toast.error(res.error, {
            position: isDesktop ? "bottom-right" : "top-center",
          });
        }
        if (res.success) {
          setIsLoading(false);
          toast.success(res.success, {
            position: isDesktop ? "bottom-right" : "top-center",
          });
        }
      } catch (err) {
        setIsLoading(false);
        console.error(err);
        toast.error("Something went wrong", {
          position: isDesktop ? "bottom-right" : "top-center",
        });
      }
    },
    [userId, isDesktop]
  );

  const DialogOrDrawer = isDesktop ? Dialog : Drawer;
  const TriggerComponent = isDesktop ? DialogTrigger : DrawerTrigger;
  const ContentComponent = isDesktop ? DialogContent : DrawerContent;
  const HeaderComponent = isDesktop ? DialogHeader : DrawerHeader;
  const TitleComponent = isDesktop ? DialogTitle : DrawerTitle;
  const DescriptionComponent = isDesktop
    ? DialogDescription
    : DrawerDescription;
  const FooterComponent = isDesktop ? DialogFooter : DrawerFooter;
  return (
    <>
      <DialogOrDrawer>
        <TriggerComponent asChild>
          <Button variant="outline">Edit Profile</Button>
        </TriggerComponent>
        <ContentComponent className="sm:max-w-[600px]">
          <HeaderComponent>
            <TitleComponent>Account Settings</TitleComponent>
            <DescriptionComponent>
              Customize your account settings here.
            </DescriptionComponent>
          </HeaderComponent>
          <div className="py-4">
            <ProfileForm
              form={form}
              fields={fields}
              append={append}
              remove={remove}
              isDesktop={isDesktop}
              onModalTriggerChange={onModalTriggerChange}
              dataFromFileUpload={dataFromFileUpload}
              modalTrigger={modalState}
            />
          </div>
          <FooterComponent>
            <Button type="button" onClick={form.handleSubmit(onSubmit)}>
              {isLoading ? (
                <>
                  <Disc3 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </FooterComponent>
        </ContentComponent>
      </DialogOrDrawer>
    </>
  );
};
