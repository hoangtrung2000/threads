import { createThread } from "@/lib/actions/thread.actions";
import { ThreadValidations } from "@/lib/validations/thread";
import { usePathname, useRouter } from "next/navigation";
import * as z from "zod";

interface UsePostThreadResult {
  onSubmit: (values: z.infer<typeof ThreadValidations>) => void;
}

const usePostThread = (userId: string): UsePostThreadResult => {
  const pathname = usePathname();
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof ThreadValidations>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: null,
      path: pathname,
    });
    router.push("/");
  };
  return {
    onSubmit,
  };
};

export default usePostThread;
