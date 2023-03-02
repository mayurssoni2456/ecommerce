import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import _ from 'lodash';

import { Request, Response, NextFunction, Handler } from 'express';
import { UserRepo } from '../database/repo';
import { User } from '../database/model';
import { createTokens } from '../auth';

import { BadRequestError, AuthFailureError } from '../common/ApiError';
import { SuccessResponse } from '../common/ApiResponse';

// export const v1GetPlans: express.Handler = async (req, res) => {

export const registration: Handler = async (req: Request, res: Response, next: NextFunction) => {

    const user = await UserRepo.findByEmail(req.body.email);
    if (user) throw new BadRequestError('User already registered');

    // Todo - password hashing logic can be handle in model class using schema.pre-save method
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const { user: createdUser } = await UserRepo.create(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile: req.body.mobile,
            email: req.body.email,
            password: passwordHash,
        } as User,
    );

    return new SuccessResponse('Signup Successful', {
        createdUser
    }).send(res);
}

export const login: Handler = async (req: Request, res: Response, next: NextFunction) => {

    const user = await UserRepo.findByEmail(req.body.email);
    if (!user) throw new BadRequestError('User not registered');


    // Todo - password hashing logic can be handle in model class using schema.pre-save method
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    if (!user.password) throw new BadRequestError('Credential not set');

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new AuthFailureError('Authentication failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
    const userData = _.pick(user, ['_id', 'firstname', 'lastname']);

    new SuccessResponse('Login Success', {
        user: userData,
        tokens: tokens,
    }).send(res);
}


export const updateProfile: Handler = async (req: Request, res: Response, next: NextFunction) => {

    const user = await UserRepo.findById(req.body._id);
    
    if (!user) throw new BadRequestError('User not registered');

    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;

    const updatedUser = await UserRepo.update(user);
    const data = _.pick(updatedUser.user, ['_id','firstname', 'lastname','updatedAt' ]);

    return new SuccessResponse('Profile updated', data).send(res);
}


export default { registration, login, updateProfile };

