import { HTTP_STATUS } from '../utils/mapHttpStatus';

export type HttpStatusType = keyof typeof HTTP_STATUS;

type DataError = {
  message: string;
};

interface ServiceResponseError {
  status: HttpStatusType;
  data: DataError;
}

interface ServiceResponse<T> {
  status: HttpStatusType;
  data: T;
}

type IServiceResponse<T> = ServiceResponse<T> | ServiceResponseError;

export default IServiceResponse;
