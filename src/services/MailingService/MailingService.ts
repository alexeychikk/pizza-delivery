import { Order } from "@src/services/OrderService";
import { PublicUser } from "@src/services/UserService";

export class MailingService {
  private mailingApi: MailingApi;

  constructor({ mailingApi }: { mailingApi: MailingApi }) {
    this.mailingApi = mailingApi;
  }

  public sendOrderPlacedEmail = async (order: Order, user: PublicUser) => {
    await this.mailingApi.sendTemplate({
      subject: "Your order at PizzaDelivery has been placed",
      template: "pizza-delivery-order-placed",
      to: user.email,
      variables: {
        order: {
          ...order,
          items: order.items.map((i) => ({
            ...i,
            costInUSD: i.amount * i.itemCostInUSD,
          })),
        },
      },
    });
  };
}

export interface MailOptions<T extends Object> {
  to: string;
  subject: string;
  template: string;
  variables: T;
}

export interface MailingApi {
  sendTemplate<T>(options: MailOptions<T>): Promise<void>;
}
