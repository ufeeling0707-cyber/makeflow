import * as Form from "@radix-ui/react-form";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import defaultProfileAvatar from "@/assets/default-profile-avatar.svg";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import type { Users } from "@/types/api";
import { Button } from "../../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../../components/ui/card";

type ProfilePictureFormComponentProps = {
  profilePicture: string;
  handleInput: (event: { target: { name: string; value: string } }) => void;
  handlePatchProfilePicture: (gradient: string) => void;
  userData: Users | null;
};
const ProfilePictureFormComponent = ({
  profilePicture,
  handleInput,
  handlePatchProfilePicture,
  userData,
}: ProfilePictureFormComponentProps) => {
  const { t } = useTranslation();
  const profileImage = profilePicture || userData?.profile_image;
  const currentUploadedProfileImage = userData?.profile_image?.startsWith(
    "data:image/",
  )
    ? userData.profile_image
    : "";
  const nextProfileImage = profilePicture || currentUploadedProfileImage;
  const profileImageUrl =
    profileImage?.startsWith("data:image/") ||
    profileImage?.startsWith("http") ||
    profileImage?.startsWith("/")
      ? profileImage
      : defaultProfileAvatar;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleInput({
          target: { name: "profilePicture", value: reader.result },
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Form.Root
      onSubmit={(event) => {
        handlePatchProfilePicture(nextProfileImage);
        event.preventDefault();
      }}
    >
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>{t("settings.profilePictureTitle")}</CardTitle>
          <CardDescription>
            {t("settings.profilePictureDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 py-2 sm:flex-row sm:items-center">
            <img
              src={profileImageUrl}
              alt="Profile preview"
              className="h-16 w-16 shrink-0 rounded-full border bg-background object-cover"
            />
            <div className="flex flex-col gap-2">
              <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-accent">
                <ForwardedIconComponent name="Upload" className="h-4 w-4" />
                프로필 사진 업로드
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="text-sm text-muted-foreground">
                업로드하지 않으면 기본 프로필 이미지가 사용됩니다.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Form.Submit asChild>
            <Button type="submit">{t("settings.saveButton")}</Button>
          </Form.Submit>
        </CardFooter>
      </Card>
    </Form.Root>
  );
};
export default ProfilePictureFormComponent;
