"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import useComment from "@/hook/useComment";
import Image from "next/image";
import { Input } from "../ui/input";

interface Props {
  threadId: string;
  currentUserId: string;
  currentUserImage: string;
}
const Comment = ({ threadId, currentUserImage, currentUserId }: Props) => {
  const { onSubmit, form } = useComment({ threadId, currentUserId });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel className="relative w-12 h-12">
                <Image
                  src={currentUserImage}
                  alt="current_user"
                  fill
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  className="no-focus text-light-1 outline-none"
                  type="text"
                  placeholder="Comment..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
