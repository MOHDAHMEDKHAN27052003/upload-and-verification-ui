import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

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
    const response = await axios.post<SendOtpResponse>(
      `${API_BASE_URL}/auth/send-otp`,
      payload,
    );

    return response.data;
  } catch (err: unknown) {
    if (!axios.isAxiosError(err)) {
      throw new Error('Something went wrong. Please try again.');
    }

    const message = err.response?.data?.message;

    if (!message) {
      throw new Error('Something went wrong. Please try again.');
    }

    throw new Error(message);
  }
}