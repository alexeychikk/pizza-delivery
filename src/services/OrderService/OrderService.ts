import { nanoid } from "nanoid";
import _ from "lodash";

import { MenuItem, MenuService } from "@src/services/MenuService";
import { PublicUser, UserService } from "@src/services/UserService";
import { validate } from "@src/validation";
import { NotFoundError, ValidationError } from "@src/errors";

import { Cart, Order } from "./schemas";

export type OrderPlacedEvent = (order: Order, user: PublicUser) => void;

export class OrderService {
  public onOrderPlaced: OrderPlacedEvent;

  private dao: OrderServiceDao;
  private menuService: MenuService;
  private userService: UserService;

  constructor({
    dao,
    menuService,
    userService,
    onOrderPlaced = () => {},
  }: {
    dao: OrderServiceDao;
    menuService: MenuService;
    userService: UserService;
    onOrderPlaced?: OrderPlacedEvent;
  }) {
    this.dao = dao;
    this.menuService = menuService;
    this.userService = userService;
    this.onOrderPlaced = onOrderPlaced;
  }

  public async updateCart(options: Cart): Promise<Cart> {
    const cart = await validate(Cart, options);
    const itemIds = cart.items.map((i) => i.itemId);
    await this.menuService.ensureItemsExist(itemIds);
    const updatedCart = await this.dao.updateCart(cart);
    if (!updatedCart) {
      throw new NotFoundError("Cart was not found");
    }
    return updatedCart;
  }

  public async getUserCart(userId: string): Promise<Cart> {
    const cart = await this.dao.findCartByUserId(userId);
    return cart ? cart : { userId, items: [] };
  }

  public async checkoutCart(userId: string): Promise<Order> {
    const [user, cart] = await Promise.all([
      this.userService.getUserById(userId),
      this.getUserCart(userId),
    ]);
    if (!cart.items.length) {
      throw new ValidationError("Cart is empty");
    }

    const itemIds = cart.items.map((i) => i.itemId);
    const menuItemsMap = await this.menuService.getItemsByIdsToMap(itemIds);
    const nonExistingItemIds = itemIds.filter((id) => !menuItemsMap[id]);

    if (nonExistingItemIds.length) {
      await this.updateCart({
        userId: user._id,
        items: cart.items.filter((i) => !nonExistingItemIds.includes(i.itemId)),
      });
      throw new ValidationError(
        "Some items have been removed from the menu. Please checkout again",
      );
    }

    const order = this.prepareOrder(cart, user, menuItemsMap);

    await Promise.all([
      this.dao.saveOrder(order),
      this.dao.updateCart({ userId, items: [] }),
    ]);
    this.onOrderPlaced(order, user);

    return order;
  }

  private prepareOrder(
    cart: Cart,
    user: PublicUser,
    menuItemsMap: { [key: string]: MenuItem },
  ): Order {
    return {
      _id: nanoid(),
      userId: user._id,
      items: cart.items.map((i) => {
        const menuItem = menuItemsMap[i.itemId];
        return {
          ...i,
          name: menuItem.name,
          itemCostInUSD: menuItem.costInUSD,
        };
      }),
      address: user.address,
      costInUSD: _.sumBy(
        cart.items,
        (i) => menuItemsMap[i.itemId].costInUSD * i.amount,
      ),
      dateCreated: new Date(),
    };
  }
}

export interface OrderServiceDao {
  updateCart(options: Cart): Promise<Cart | null>;
  findCartByUserId(userId: string): Promise<Cart | null>;
  saveOrder(order: Order): Promise<void>;
}
