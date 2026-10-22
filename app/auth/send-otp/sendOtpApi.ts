import { apiClient } from "@/app/api";

export interface SendOtpPayload {
  email: string;
}

export interface SendOtpResponse {
  message: string;
}

export interface SendOtpResult {
  success: boolean;
  data?: SendOtpResponse;
  error?: string;
}

export async function sendOtpApi(payload: SendOtpPayload): Promise<SendOtpResult> {
  try {
    const response = await apiClient.post<SendOtpResponse>(
      '/auth/send-otp',
      payload
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: "Failed to send OTP" };
  }
}