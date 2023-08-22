import { addCommentToThread } from "@/lib/actions/thread.actions";
import { CommentValidations } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

interface UseCommentResult {
  onSubmit: (values: z.infer<typeof CommentValidations>) => void;
  form: UseFormReturn<
    {
      thread: string;
    },
    any,
    undefined
  >;
}

interface Props {
  threadId: string;
  currentUserId: string;
}

const useComment = ({ threadId, currentUserId }: Props): UseCommentResult => {
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidations),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidations>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );
    form.reset();
  };
  return {
    onSubmit,
    form,
  };
};

export default useComment;
