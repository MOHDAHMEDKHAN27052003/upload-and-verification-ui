import { Metadata } from "next";
import SendOtpUi from "./SendOtpUi";

export const metadata: Metadata = {
  title: "Send OTP",
};

export default function SendOtpPage() {
    return <SendOtpUi />
}