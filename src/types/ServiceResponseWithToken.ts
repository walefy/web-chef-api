import IServiceResponse from '../interfaces/IService';

export type Token = { token: string };
export type ServiceResponseWithToken = Promise<IServiceResponse<Token>>;
