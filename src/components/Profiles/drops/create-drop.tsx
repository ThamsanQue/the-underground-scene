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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useMediaQuery from "@/hooks/useMediaQuery";
import { formSchema } from "@/lib/types/types";
import { addDrop } from "@/server-actions/artist-drops";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface DropProps {
  userId: string | undefined;
}
export const CreateDrop = ({ userId }: DropProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      urls: [{ id: Date.now().toString(), value: "" }],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      userId,
      ...values,
      urls: values.urls?.map((url) => url.value),
    };
    startTransition(() => {
      addDrop(payload)
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
          form.reset();
        })
        .catch((err) => {
          console.error(err, "err");
          toast.error("Something went wrong", {
            position: isDesktop ? "bottom-right" : "top-center",
          });
        });
    });
  }

  const DropForm = () => {
    return (
      <div className="grid gap-6 py-6 m-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="drop-form">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the title of the drop"
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell the world about the drop"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="urls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drop Links</FormLabel>
                  <div className="col-span-3 grid gap-4">
                    {field.value &&
                      field.value.map((link, index) => (
                        <div key={link.id} className="flex items-center">
                          <FormControl>
                            <Input
                              placeholder="Add links to the drop!"
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
                      disabled={(field.value || []).length >= 3}
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
            <DropForm />
            <DialogFooter>
              <Button type="submit" form="drop-form" disabled={isPending}>
                Drop
              </Button>
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
            <DropForm />
            <DrawerFooter>
              <Button type="submit" form="drop-form">
                Drop
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
