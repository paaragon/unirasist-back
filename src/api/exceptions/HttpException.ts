class HttpException extends Error {
  status: number;
  message: string;
  extra: any;
  constructor(status: number, message: string, extra?: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.extra = extra;
  }
}

export default HttpException;
