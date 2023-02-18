export interface response {
  code: number;
  message: string | Error;
  token?: string | any;
  data?: any;
}
