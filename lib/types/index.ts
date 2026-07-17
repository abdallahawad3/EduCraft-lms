/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiResponse = {
  status: 'error' | 'success';
  message: string;
  data?: null | any;
};
