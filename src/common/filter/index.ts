import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

export function getMsg(message) {
  if (!message) {
    return `no message`;
  }
  if (message.message && message.statusCode) {
    if (message.message.push) {
      return message.message
        .map(v => v.constraints)
        .reduce(
          (prev, next) => [...prev, ...Object.keys(next).map(key => next[key])],
          [],
        );
    }
    return message.message;
  }

  return message || message.error || message;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const { message } = exception;

    response.status(200).json({
      errcode: status,
      // timestamp: new Date().toISOString(),
      path: request.url,
      msg: getMsg(message),
    });
  }
}
