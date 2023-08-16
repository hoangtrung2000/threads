import { isBase64Image } from "@/lib/utils";
import { UserValidations } from "@/lib/validations/user";
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import * as z from "zod";

interface AccountProfileResult {
  files: File[];
  handleImage: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => void;
  onSubmit: (values: z.infer<typeof UserValidations>) => void;
}

const userAccountProfile = (userId: string): AccountProfileResult => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const pathname = usePathname();

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof UserValidations>) => {
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    await updateUser({
      userId: userId,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
    });

    if (pathname === "profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  return {
    handleImage,
    files,
    onSubmit,
  };
};

export default userAccountProfile;
