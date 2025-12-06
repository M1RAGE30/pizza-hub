import { NextResponse } from "next/server";

export function successResponse(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 500, error?: unknown) {
  if (error) {
    console.error(`[API_ERROR] ${message}`, error);
  }
  return NextResponse.json({ message, error: error?.toString() }, { status });
}

export function handleApiError(error: unknown, defaultMessage: string) {
  console.error(`[API_ERROR] ${defaultMessage}`, error);
  return errorResponse(
    defaultMessage,
    500,
    error instanceof Error ? error : undefined
  );
}
