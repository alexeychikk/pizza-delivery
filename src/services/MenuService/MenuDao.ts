import { Database } from "@src/services/Database";

import { MenuServiceDao } from "./MenuService";
import { MenuItem } from "./schemas";

export class MenuDao implements MenuServiceDao {
  private db: Database;

  constructor({ db }: { db: Database }) {
    this.db = db;
  }

  public async getAllItems(): Promise<MenuItem[]> {
    const res = await this.itemsCollection.find({}).exec();
    // @ts-ignore Wrong typings in the nedb-promise package
    return res as MenuItem[];
  }

  public async insertManyItems(items: MenuItem[]): Promise<void> {
    await this.itemsCollection.insert(items);
  }

  public async findItemById(_id: string): Promise<MenuItem | null> {
    return this.itemsCollection.findOne<MenuItem>({ _id });
  }

  public async findItemsByIds(ids: string[]): Promise<MenuItem[]> {
    const res = await this.itemsCollection.find({ _id: { $in: ids } }).exec();
    // @ts-ignore Wrong typings in the nedb-promise package
    return res as MenuItem[];
  }

  private get itemsCollection() {
    return this.db.menu;
  }
}
