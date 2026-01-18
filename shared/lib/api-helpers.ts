import { NextResponse } from "next/server";

export function errorResponse(message: string, status = 500, error?: unknown) {
  if (error) {
    console.error(`[API_ERROR] ${message}`, error);
  }
  const errorString =
    error instanceof Error ? error.message : error?.toString();
  return NextResponse.json({ message, error: errorString }, { status });
}

export function handleApiError(error: unknown, defaultMessage: string) {
  console.error(`[API_ERROR] ${defaultMessage}`, error);
  return errorResponse(
    defaultMessage,
    500,
    error instanceof Error ? error : undefined
  );
}
