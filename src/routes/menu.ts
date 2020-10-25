import { authenticate } from "@src/auth";
import { MenuService } from "@src/services/MenuService";
import { PizzaDeliveryApp } from "@src/types";

export const createMenuRoutes = async ({
  app,
  menuService,
}: {
  app: PizzaDeliveryApp;
  menuService: MenuService;
}) => {
  await menuService.insertFakeItems();

  app.route({
    method: "GET",
    url: "/menu",
    preHandler: authenticate,
    handler: async (request, reply) => {
      const items = await menuService.getAllItems();
      await reply.send(items);
    },
  });
};
