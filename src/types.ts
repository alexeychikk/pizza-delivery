import { IncomingMessage, Server, ServerResponse } from "http";
import * as fastify from "fastify";

export type PizzaDeliveryApp = fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
>;

export type AppRoutePreHandler = Parameters<
  PizzaDeliveryApp["route"]
>[0]["preHandler"];

export type AppRouteHandler = Parameters<
  PizzaDeliveryApp["route"]
>[0]["handler"];

export type AppRequest = Parameters<AppRouteHandler>[0];

export type AppReply = Parameters<AppRouteHandler>[1];

export type FastifySession = AppRequest["session"];

export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
