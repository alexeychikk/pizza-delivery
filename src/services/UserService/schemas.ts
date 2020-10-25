import { nanoid } from "nanoid";
import {
  Equals,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

import { IsNanoid } from "@src/validation/IsNanoid";
import { PartialKeys } from "@src/types";

export enum UserValidationGroups {
  Create = "Create",
  Update = "Update",
}

export class UserCredentials {
  @IsOptional({ groups: [UserValidationGroups.Update] })
  @IsEmail({}, { always: true })
  public email!: string;

  @Equals(undefined, {
    groups: [UserValidationGroups.Update],
    message: "Password cannot be changed",
  })
  @IsString({ groups: [UserValidationGroups.Create] })
  @MinLength(5, { groups: [UserValidationGroups.Create] })
  public password!: string;

  constructor(data: UserCredentials) {
    Object.assign(this, data);
  }
}

export class User extends UserCredentials {
  @IsNanoid({ always: true })
  public _id!: string;

  @IsOptional({ groups: [UserValidationGroups.Update] })
  @IsString({ always: true })
  @MinLength(1, { always: true })
  public firstName!: string;

  @IsOptional({ groups: [UserValidationGroups.Update] })
  @IsString({ always: true })
  @MinLength(1, { always: true })
  public lastName!: string;

  @IsOptional({ groups: [UserValidationGroups.Update] })
  @IsString({ always: true })
  @MinLength(1, { always: true })
  public address!: string;

  public passwordHash!: string;

  constructor({
    _id = nanoid(),
    email,
    password,
    ...data
  }: PartialKeys<RawUser, "_id"> & { password?: string }) {
    super({ email, password: password! });
    Object.assign(this, { _id, ...data });
  }

  public getPublicUser(): PublicUser {
    const { password, passwordHash, getPublicUser, ...publicUser } = this;
    return publicUser;
  }
}

export type RawUser = Omit<User, "getPublicUser" | "password">;

export type PublicUser = Omit<RawUser, "passwordHash">;

export type CreateUserOptions = Omit<RawUser, "_id" | "passwordHash"> & {
  password: string;
};

export type UpdateUserOptions = Partial<Omit<CreateUserOptions, "password">> &
  Pick<User, "_id">;

export class FindUserOptions {
  @IsNanoid()
  public _id!: string;

  constructor(data: FindUserOptions) {
    Object.assign(this, data);
  }
}
