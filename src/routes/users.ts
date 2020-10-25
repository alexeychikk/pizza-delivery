import {
  authenticate,
  authenticateById,
  logout,
  saveUserSession,
} from "@src/auth";
import {
  CreateUserOptions,
  UpdateUserOptions,
  UserCredentials,
  UserService,
} from "@src/services/UserService";
import { PizzaDeliveryApp } from "@src/types";

export const createUserRoutes = ({
  app,
  userService,
}: {
  app: PizzaDeliveryApp;
  userService: UserService;
}) => {
  app.route({
    method: "POST",
    url: "/users",
    handler: async (request, reply) => {
      const user = await userService.createUser(
        request.body as CreateUserOptions,
      );

      saveUserSession(request, user);

      await reply.send(user);
    },
  });

  app.route({
    method: "GET",
    url: "/users/:id",
    preHandler: authenticateById,
    handler: async (request, reply) => {
      const user = await userService.getUserById(request.session.user._id);
      await reply.send(user);
    },
  });

  app.route({
    method: "GET",
    url: "/users/me",
    preHandler: authenticate,
    handler: async (request, reply) => {
      const user = await userService.getUserById(request.session.user._id);
      await reply.send(user);
    },
  });

  app.route({
    method: "PUT",
    url: "/users/:id",
    preHandler: authenticateById,
    handler: async (request, reply) => {
      const user = await userService.updateUser({
        ...(request.body as Object),
        _id: request.session.user._id,
      } as UpdateUserOptions);

      // In case email was updated
      // This should not be the case in a real prod app
      saveUserSession(request, user);

      await reply.send(user);
    },
  });

  app.route({
    method: "PUT",
    url: "/users/me",
    preHandler: authenticate,
    handler: async (request, reply) => {
      const user = await userService.updateUser({
        ...(request.body as Object),
        _id: request.session.user._id,
      } as UpdateUserOptions);

      saveUserSession(request, user);

      await reply.send(user);
    },
  });

  app.route({
    method: "POST",
    url: "/users/login",
    handler: async (request, reply) => {
      const user = await userService.validateUserCredentials(
        request.body as UserCredentials,
      );

      saveUserSession(request, user);

      await reply.send(user);
    },
  });

  app.route({
    method: "POST",
    url: "/users/logout",
    preHandler: authenticate,
    handler: async (request, reply) => {
      await logout(request);
      await reply.send({});
    },
  });

  app.route({
    method: "DELETE",
    url: "/users/:id",
    preHandler: authenticateById,
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      await userService.deleteUser(id);

      await logout(request);
      await reply.send({});
    },
  });

  app.route({
    method: "DELETE",
    url: "/users/me",
    preHandler: authenticate,
    handler: async (request, reply) => {
      await userService.deleteUser(request.session.user._id);
      await logout(request);
      await reply.send({});
    },
  });
};
