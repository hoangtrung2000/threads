import * as z from "zod";

export const ThreadValidations = z.object({
  thread: z.string().nonempty().min(3, { message: "Minium 3 characters" }),
  accountId: z.string(),
});

export const CommentValidations = z.object({
  thread: z.string().nonempty().min(3, { message: "Minium 3 characters" }),
});
