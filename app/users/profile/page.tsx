import { Metadata } from "next";
import ProfileUi from "./ui";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function ProfilePage() {
    return <ProfileUi />
}