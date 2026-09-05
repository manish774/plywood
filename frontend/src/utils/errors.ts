import type { AxiosError } from "axios";

interface ApiErrorData {
  error?: string;
  message?: string;
}

// The backend always responds with { error: "<message>" } on failure.
// Mock mode throws plain Error objects with a .message instead.
export function getErrorMessage(
  err: AxiosError<ApiErrorData> | Error | unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  const axiosErr = err as AxiosError<ApiErrorData> | undefined;
  return (
    axiosErr?.response?.data?.error ||
    axiosErr?.response?.data?.message ||
    (err as Error | undefined)?.message ||
    fallback
  );
}
