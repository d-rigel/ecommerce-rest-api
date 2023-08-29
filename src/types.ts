export interface ResponseErrorType {
    message?: string;
}

export interface ResponseType<T> {
    message: string;
    data: T;
    statusCode: number;
    errors?: ResponseErrorType[];
}

export interface IError extends Error {
    statusCode?: number | undefined
}

export interface IRequest extends Request {
    userAuth: any;
    params: any;
    body: any;
}

export interface IHeader extends Headers {
    authorization?: string;
}