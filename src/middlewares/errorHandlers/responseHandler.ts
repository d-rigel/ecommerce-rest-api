import { ResponseType, ResponseErrorType } from "../../types";

export function successResponse<T>(
  data: T,
  message: string,
  statusCode: number,
): ResponseType<T> {
  return {
    message: message ? message : "",
    data,
    statusCode,
  };
}

export function errorResponse<T>(
  data: T,
  statusCode: number,
  message: string,
  errors?: ResponseErrorType[]
): ResponseType<T> {
  return {
    data,
    errors: errors || [],
    statusCode,
    message: message ? message : "",
  };
}