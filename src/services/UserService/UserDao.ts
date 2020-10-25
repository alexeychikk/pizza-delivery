import _ from "lodash";

import { Database } from "@src/services/Database";

import { RawUser, UpdateUserOptions, User } from "./schemas";
import { UserServiceDao } from "./UserService";

export class UserDao implements UserServiceDao {
  private db: Database;

  constructor({ db }: { db: Database }) {
    this.db = db;
    void this.usersCollection.ensureIndex({ fieldName: "email", unique: true });
  }

  public async saveUser(user: User) {
    await this.usersCollection.insert(user);
  }

  public async findUserById(_id: string) {
    const rawUser = await this.usersCollection.findOne<RawUser>({ _id });
    return rawUser && new User(rawUser);
  }

  public async findUserByEmail(email: string) {
    const rawUser = await this.usersCollection.findOne<RawUser>({ email });
    return rawUser && new User(rawUser);
  }

  public async updateUser({ _id, ...data }: UpdateUserOptions) {
    const rawUser = await this.usersCollection.update<RawUser>(
      { _id },
      { $set: _.pickBy(data, (v) => v != null) },
      { returnUpdatedDocs: true, multi: false },
    );
    return rawUser && new User(rawUser);
  }

  public async deleteUser(_id: string) {
    const numRemoved = await this.usersCollection.remove(
      { _id },
      { multi: false },
    );

    return !!numRemoved;
  }

  private get usersCollection() {
    return this.db.users;
  }
}
