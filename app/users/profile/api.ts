import { apiClient } from "@/app/api";

export interface User {
  _id: string;
  email: string;
  role: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetMeSuccessResponse {
  user: User;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
}

export async function getMe(): Promise<GetMeSuccessResponse> {
  try {
    const response = await apiClient.get<GetMeSuccessResponse>("/users/me");
    return response.data;
  } catch (error: any) {
    // Normalize error so the page can render a friendly message
    const apiError: ApiErrorResponse = {
      message:
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong while fetching your profile.",
      statusCode: error?.response?.status ?? 500,
    };
    throw apiError;
  }
}