import { Metadata } from "next";
import ProfileUi from "./ui";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
    return <ProfileUi />
}