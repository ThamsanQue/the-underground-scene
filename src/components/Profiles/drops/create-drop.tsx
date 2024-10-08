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
import { DropData, formSchema } from "@/lib/types/types";
import { addDrop } from "@/server-actions/artist-drops";
import { zodResolver } from "@hookform/resolvers/zod";
import { Disc3, MinusCircle, PlusCircle } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useFieldArray, UseFieldArrayAppend, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface DropProps {
  userId: string | undefined;
}

interface DropFormProps {
  form: ReturnType<typeof useForm<DropData>>;
  fields: ReturnType<typeof useFieldArray>["fields"];
  append: UseFieldArrayAppend<DropData, "urls">;
  remove: ReturnType<typeof useFieldArray>["remove"];
}

const DropForm = memo(({ form, fields, append, remove }: DropFormProps) => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      ) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100); // Small delay to ensure the keyboard is fully open
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
      className="grid gap-6 py-6 m-4 overflow-y-auto max-h-[calc(100vh-120px)]"
    >
      <Form {...form}>
        <form>
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

          <FormLabel className="mb-2 block mt-4">Drop Links</FormLabel>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <div className="col-span-3 grid gap-4">
                    <div className="flex items-center mb-4">
                      <FormControl>
                        <Input
                          placeholder="Add links to the drop!"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      {index > 0 && (
                        <Button
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                          variant={"outline"}
                          size={"icon"}
                          className="ml-2"
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            onClick={() => {
              append({ id: Date.now().toString(), value: "" });
            }}
            variant={"outline"}
            className="mt-2 mx-auto w-full"
            disabled={fields.length >= 3}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
});
DropForm.displayName = "DropForm";
export const CreateDrop = ({ userId }: DropProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      urls: [{ id: Date.now().toString(), value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "urls",
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const payload = {
        userId,
        ...values,
        urls: values.urls?.map((url) => url.value),
      };
      try {
        setIsLoading(true);
        const res = await addDrop(payload);
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
          form.reset();
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        toast.error("Something went wrong", {
          position: isDesktop ? "bottom-right" : "top-center",
        });
      }
    },
    [userId, isDesktop, form]
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
          <Button variant="outline">Create Drop</Button>
        </TriggerComponent>
        <ContentComponent className="sm:max-w-[600px]">
          <HeaderComponent>
            <TitleComponent>Create Drop</TitleComponent>
            <DescriptionComponent>
              Consistency is the key to pushing out work that stands the test of
              time.
            </DescriptionComponent>
          </HeaderComponent>
          <DropForm
            form={form}
            fields={fields}
            append={append}
            remove={remove}
          />
          <FooterComponent>
            <Button type="button" onClick={form.handleSubmit(onSubmit)}>
              {isLoading ? (
                <>
                  <Disc3 className="mr-2 h-4 w-4 animate-spin" />
                  Dropping 💥💥💥
                </>
              ) : (
                "Drop 🧨"
              )}
            </Button>
          </FooterComponent>
        </ContentComponent>
      </DialogOrDrawer>
    </>
  );
};
