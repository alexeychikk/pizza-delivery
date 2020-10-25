import { AuthError, NotFoundError } from "@src/errors";
import { hashPassword, isPasswordValid } from "@src/auth";
import { validate } from "@src/validation";

import {
  CreateUserOptions,
  FindUserOptions,
  PublicUser,
  UpdateUserOptions,
  User,
  UserCredentials,
  UserValidationGroups,
} from "./schemas";

export class UserService {
  private dao: UserServiceDao;

  constructor({ dao }: { dao: UserServiceDao }) {
    this.dao = dao;
  }

  public async createUser(options: CreateUserOptions): Promise<PublicUser> {
    const { password, ...userData } = await validate(User, options, [
      UserValidationGroups.Create,
    ]);

    const passwordHash = await hashPassword(password);
    const user = new User({ ...userData, passwordHash });
    await this.dao.saveUser(user);

    return user.getPublicUser();
  }

  public async getUserById(_id: string): Promise<PublicUser> {
    await validate(FindUserOptions, { _id });
    const user = await this.dao.findUserById(_id);
    if (!user) {
      throw new NotFoundError("User was not found");
    }
    return user.getPublicUser();
  }

  public async updateUser(options: UpdateUserOptions): Promise<PublicUser> {
    const partialUser = await validate(User, options, [
      UserValidationGroups.Update,
    ]);
    const user = await this.dao.updateUser(partialUser.getPublicUser());
    if (!user) {
      throw new NotFoundError("User was not found");
    }
    return user.getPublicUser();
  }

  public async deleteUser(_id: string) {
    await validate(FindUserOptions, { _id });
    const deleted = await this.dao.deleteUser(_id);
    if (!deleted) {
      throw new NotFoundError("User was not found");
    }
  }

  public async validateUserCredentials(
    credentials: UserCredentials,
  ): Promise<PublicUser> {
    const { email, password } = await validate(UserCredentials, credentials, [
      UserValidationGroups.Create,
    ]);
    const user = await this.dao.findUserByEmail(email);
    if (!user) {
      throw new AuthError("Email or password is incorrect");
    }
    const valid = await isPasswordValid(password, user.passwordHash);
    if (!valid) {
      throw new AuthError("Email or password is incorrect");
    }
    return user.getPublicUser();
  }
}

export interface UserServiceDao {
  saveUser(user: User): Promise<void>;
  updateUser(updateUser: UpdateUserOptions): Promise<User | null>;
  findUserById(_id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  deleteUser(_id: string): Promise<boolean>;
}
