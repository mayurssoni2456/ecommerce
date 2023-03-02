import express from 'express';
import { Types } from 'mongoose';
import asyncHandler from 'express-async-handler';
import UserRepo from '../database/repo/UserRepo';
import {
    AuthFailureError,
    AccessTokenError,
    TokenExpiredError,
    ForbiddenError,
} from '../common/ApiError';
import JWT from '../common/JWT';

import { getAccessToken, validateTokenData } from '../auth';
import validator, { ValidationSource } from '../helper/validator';
import schema from './schema';
import { User } from '../database/model';
import { emitWarning } from 'process';

interface APIRequest extends express.Request {
    accessToken: string,
    user: User
}

const router = express.Router();

export default router.use(
    validator(schema.auth, ValidationSource.HEADER),
    asyncHandler(async (req: APIRequest, res, next) => {
        req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

        try {
            const payload = await JWT.validate(req.accessToken);
            validateTokenData(payload);

            const user = await UserRepo.findById(new Types.ObjectId(payload.sub));

            if (!user) throw new AuthFailureError('User not registered');
            req.user = user;

            if (req.body._id !== payload.sub) throw new ForbiddenError("forbiden");
            if (!payload) throw new AuthFailureError('Invalid access token');
            return next();
        } catch (e) {
            if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
            throw e;
        }
    }),
);