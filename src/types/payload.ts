import { JwtPayload } from 'jsonwebtoken';

export type CreationPayloadType = {
  name: string,
  id: string,
};

export interface JwtPayloadType extends JwtPayload, CreationPayloadType {}
