import path from "path";
import NeDB from "nedb-promises";

export class Database {
  public users: NeDB;
  public menu: NeDB;
  public carts: NeDB;
  public orders: NeDB;

  private dbFolder: string;

  constructor({ dbFolder }: { dbFolder: string }) {
    this.dbFolder = dbFolder;

    this.users = NeDB.create(this.getCollectionFilename("users"));
    this.menu = NeDB.create(this.getCollectionFilename("menu"));
    this.carts = NeDB.create(this.getCollectionFilename("carts"));
    this.orders = NeDB.create(this.getCollectionFilename("orders"));
  }

  private getCollectionFilename(collectionName: string): string {
    return path.join(
      __dirname,
      "../../../",
      this.dbFolder,
      `./${collectionName}.db`,
    );
  }
}
