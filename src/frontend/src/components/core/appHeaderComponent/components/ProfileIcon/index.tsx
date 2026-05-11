import { useContext } from "react";
import defaultProfileAvatar from "@/assets/default-profile-avatar.svg";
import { AuthContext } from "@/contexts/authContext";

interface ProfileIconProps {
  className?: string;
}

export function ProfileIcon({ className }: ProfileIconProps = {}) {
  const { userData } = useContext(AuthContext);
  const profileImage = userData?.profile_image;

  const profileImageUrl =
    profileImage?.startsWith("data:image/") ||
    profileImage?.startsWith("http") ||
    profileImage?.startsWith("/")
      ? profileImage
      : defaultProfileAvatar;

  return (
    <img
      src={profileImageUrl}
      alt="User"
      className={
        className ??
        "h-6 w-6 shrink-0 rounded-full object-cover focus-visible:outline-0"
      }
    />
  );
}
