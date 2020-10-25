import createDebug from "debug";
import fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifyCookie from "fastify-cookie";
import fastifySession from "fastify-session";

import { PizzaDeliveryApp } from "./types";
import { Database } from "./services/Database";

const debug = createDebug("pizza-delivery-app:api");

export type ServerOptions = {
  dbFolder: string;
  sessionSecret: string;
  mailgunApiKey: string;
  mailgunDomain: string;
  mailgunEmail: string;
  onError?: Function;
};

export type BootstrapResult = {
  app: PizzaDeliveryApp;
  db: Database;
};

export const bootstrap = async ({
  dbFolder,
  sessionSecret,
  mailgunApiKey,
  mailgunDomain,
  mailgunEmail,
  onError = () => {},
}: ServerOptions): Promise<BootstrapResult> => {
  const app: PizzaDeliveryApp = fastify({
    bodyLimit: 30 * 1024 * 1024,
  });

  await app.register(fastifyCors, {
    // Replace with your actual CORS settings here
    origin: /localhost$|localhost:\d+$|192\.168\.|10\.0\./,
    credentials: true,
  });
  await app.register(fastifyCookie);
  await app.register(fastifySession, {
    cookieName: "sessionToken",
    secret: sessionSecret,
    cookie: {
      secure: "auto",
      maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
    },
  });

  const db = new Database({ dbFolder });

  app.get("/", async (request, reply) => {
    void reply.send({});
  });

  app.addHook("onSend", async (request, reply, payload) => {
    debug("%s %s\n%s", request.raw.method, request.raw.url, payload);
    return payload;
  });

  app.addHook("onClose", async (instance, done) => {
    // await mongoClient.close();
    done();
  });

  app.setErrorHandler((error, request, reply) => {
    if (
      error instanceof Error &&
      (!error.statusCode || error.statusCode === 500)
    ) {
      onError(error);
    }
    return reply.send(error);
  });

  return { app, db };
};
