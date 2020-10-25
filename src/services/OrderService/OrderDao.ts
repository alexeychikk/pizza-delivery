import { Database } from "@src/services/Database";

import { OrderServiceDao } from "./OrderService";
import { Cart, Order } from "./schemas";

export class OrderDao implements OrderServiceDao {
  private db: Database;

  constructor({ db }: { db: Database }) {
    this.db = db;
    void this.cartsCollection.ensureIndex({
      fieldName: "userId",
      unique: true,
    });
  }

  public async updateCart({ userId, items }: Cart): Promise<Cart | null> {
    return this.cartsCollection.update<Cart>(
      { userId },
      { $set: { items } },
      { multi: false, returnUpdatedDocs: true, upsert: true },
    );
  }

  public async findCartByUserId(userId: string): Promise<Cart | null> {
    return this.cartsCollection.findOne({ userId });
  }

  public async saveOrder(order: Order) {
    await this.ordersCollection.insert(order);
  }

  private get cartsCollection() {
    return this.db.carts;
  }

  private get ordersCollection() {
    return this.db.orders;
  }
}
