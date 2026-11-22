import { Metadata } from "next";
import VerifyOtpUi from "./ui";

export const metadata: Metadata = {
  title: "Verify OTP",
};

export default function VerifyOtpPage() {
    return <VerifyOtpUi />
}