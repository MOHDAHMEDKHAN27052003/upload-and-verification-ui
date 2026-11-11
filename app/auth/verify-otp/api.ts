import { apiClient } from '@/app/api'; // adjust path to your existing axios instance

export interface VerifyOtpPayload {
  email: string;
  otp: number;
}

export interface VerifyOtpResponse {
  message: string;
}

export interface VerifyOtpError {
  message: string;
  error?: string;
  statusCode?: number;
}

/**
 * Verifies the OTP sent to the user's email.
 */
export const verifyOtp = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  try {
    const response = await apiClient.post<VerifyOtpResponse>(
      '/auth/verify-otp',
      payload
    );
    return response.data;
  } catch (error: any) {
    // Normalize error shape from backend / network failure
    const err: VerifyOtpError = {
      message:
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong while verifying OTP',
      error: error?.response?.data?.error,
      statusCode: error?.response?.status,
    };
    throw err;
  }
};