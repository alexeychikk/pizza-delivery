import { authenticate } from "@src/auth";
import { CartItem, OrderService } from "@src/services/OrderService";
import { PizzaDeliveryApp } from "@src/types";

export const createCartRoutes = ({
  app,
  orderService,
}: {
  app: PizzaDeliveryApp;
  orderService: OrderService;
}) => {
  app.route({
    method: "POST",
    url: "/cart",
    preHandler: authenticate,
    handler: async (request, reply) => {
      const { items } = request.body as { items: CartItem[] };
      const cart = await orderService.updateCart({
        userId: request.session.user._id,
        items,
      });
      await reply.send(cart);
    },
  });

  app.route({
    method: "PUT",
    url: "/cart",
    preHandler: authenticate,
    handler: async (request, reply) => {
      const { items } = request.body as { items: CartItem[] };
      const cart = await orderService.updateCart({
        userId: request.session.user._id,
        items,
      });
      await reply.send(cart);
    },
  });

  app.route({
    method: "GET",
    url: "/cart",
    preHandler: authenticate,
    handler: async (request, reply) => {
      const cart = await orderService.getUserCart(request.session.user._id);
      await reply.send(cart);
    },
  });

  app.route({
    method: "POST",
    url: "/cart/checkout",
    preHandler: authenticate,
    handler: async (request, reply) => {
      const order = await orderService.checkoutCart(request.session.user._id);
      await reply.send(order);
    },
  });

  app.route({
    method: "DELETE",
    url: "/cart",
    preHandler: authenticate,
    handler: async (request, reply) => {
      const cart = await orderService.updateCart({
        userId: request.session.user._id,
        items: [],
      });
      await reply.send(cart);
    },
  });
};
