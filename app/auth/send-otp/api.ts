import { apiClient } from "@/app/api";

export interface SendOtpPayload {
    email: string;
}

export interface SendOtpResult {
    success: boolean;
    message?: string;
}

export async function sendOtpApi(
    payload: SendOtpPayload
): Promise<SendOtpResult> {
    try {
        await apiClient.post("/auth/send-otp", payload);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: "Failed to send OTP, Please try again!",
        };
    }
}