import Joi from 'joi';
import { JoiAuthBearer } from '../helper/validator';

export const enum Header {
    AUTHORIZATION = 'authorization',
  }
export default {
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
};