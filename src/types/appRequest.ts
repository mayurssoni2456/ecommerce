import { Request } from 'express';
import User from '../database/model/User';
import ApiKey from '../database/model/ApiKey';

declare interface PublicRequest extends Request {
  apiKey: ApiKey;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCodes: string[];
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}