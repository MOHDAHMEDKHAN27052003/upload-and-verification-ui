import { apiClient } from "@/app/api";

export interface SendOtpPayload {
  email: string;
}

export interface SendOtpResponse {
  message: string;
}

export async function sendOtp(
  payload: SendOtpPayload,
): Promise<SendOtpResponse> {
  try {
    const { data } = await apiClient.post<SendOtpResponse>(
      '/auth/send-otp',
      payload,
    );
    return data;
  } catch (err: any) {
    const message = err.response?.data?.message;

    if (!message) {
      throw new Error('Something went wrong. Please try again.');
    }

    throw new Error(message);
  }
}