import { NotFoundError } from "@src/errors";

import { fakeMenuItems } from "./fakeMenuItems";
import { MenuItem } from "./schemas";

export class MenuService {
  private dao: MenuServiceDao;

  constructor({ dao }: { dao: MenuServiceDao }) {
    this.dao = dao;
  }

  public async getAllItems(): Promise<MenuItem[]> {
    return this.dao.getAllItems();
  }

  public async getItemById(_id: string): Promise<MenuItem> {
    const item = await this.dao.findItemById(_id);
    if (!item) {
      throw new NotFoundError("Menu item was not found");
    }
    return item;
  }

  public async getItemsByIds(ids: string[]): Promise<MenuItem[]> {
    return this.dao.findItemsByIds(ids);
  }

  public async getItemsByIdsToMap(
    ids: string[],
  ): Promise<{ [key: string]: MenuItem }> {
    const menuItems = await this.getItemsByIds(ids);
    return menuItems.reduce((res: { [key: string]: MenuItem }, item) => {
      res[item._id] = item;
      return res;
    }, {});
  }

  public async insertFakeItems(): Promise<void> {
    try {
      await this.dao.insertManyItems(fakeMenuItems);
    } catch (e) {
      if (e.errorType !== "uniqueViolated") {
        throw e;
      }
    }
  }

  public async ensureItemsExist(ids: string[]): Promise<void> {
    const items = await this.getItemsByIdsToMap(ids);
    for (const id of ids) {
      if (!items[id]) {
        throw new NotFoundError(`Menu item ${id} was not found`);
      }
    }
  }
}

export interface MenuServiceDao {
  getAllItems(): Promise<MenuItem[]>;
  insertManyItems(items: MenuItem[]): Promise<void>;
  findItemById(_id: string): Promise<MenuItem | null>;
  findItemsByIds(ids: string[]): Promise<MenuItem[]>;
}
