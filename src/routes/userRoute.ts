import express from 'express';
import asyncHandler from 'express-async-handler'
import authentication from '../auth/authentication';

import UserController from '../user/userController';

const router = express.Router();
router.post("/register", asyncHandler(UserController.registration));
router.post("/login", asyncHandler(UserController.login));

router.put("/profile", authentication, asyncHandler(UserController.updateProfile));


export default router;