import { Metadata } from "next";
import SendOtpUi from "./ui";

export const metadata: Metadata = {
  title: "Send OTP",
};

export default function SendOtpPage() {
  return <SendOtpUi />
}