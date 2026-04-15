interface IErrorResponse {
  message: string;
  statusCode?: number;
  [key: string]: any;
}

export type ErrorResponseWithStatusCode = IErrorResponse  & any;