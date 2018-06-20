export class Response<T> {
  payload: T;
  
  version: number;
  
  status: number;
  
  message: string;
  
  errorOccured: boolean;
  
  errors: string[];
  
}