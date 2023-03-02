import User, { UserModel } from '../model/User';
import { Types } from 'mongoose';
import { BadRequestError } from '../../common/ApiError';

async function exists(id: Types.ObjectId): Promise<boolean> {
  const user = await UserModel.exists({ _id: id });
  return user !== null && user !== undefined;
}

// contains critical information of the user
async function findById(id: Types.ObjectId): Promise<User | null> {
  return UserModel.findOne({ _id: id })
    .select('+email +password')
    .lean()
    .exec();
}

async function findByEmail(email: string): Promise<User | null> {

  return UserModel.findOne({ email: email })
    .select(
      '+email +password',
    )
    .lean()
    .exec();
}

async function create(
  user: User
): Promise<{ user: User }> {

  try {
    const now = new Date();
    user.createdAt = user.updatedAt = now;
    const createdUser = await UserModel.create(user);
    return {
      user: { ...createdUser.toObject() }
    };
  } catch(error: any) {
      throw new BadRequestError(`${error.code}`);
  }
  


}

async function update(
  user: User
): Promise<{ user: User }> {
  user.updatedAt = new Date();
  await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
    .lean()
    .exec();
  return { user: user };
}

export default {
  exists,
  findByEmail,
  findById,
  create,
  update
}