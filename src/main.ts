import { bootstrap } from "./bootstrap";
import env from "./env";

async function runServer() {
  const onError = (e: Error) => {
    // You might configure Sentry here
    console.error("[UNHANDLED]: ", e);
  };

  const { app } = await bootstrap({
    dbFolder: env.dbFolder,
    sessionSecret: env.sessionSecret,
    mailgunApiKey: env.mailgunApiKey,
    mailgunDomain: env.mailgunDomain,
    mailgunEmail: env.mailgunEmail,
    onError,
  });

  return app.listen(env.port, "0.0.0.0");
}

runServer()
  .then((address) => {
    // eslint-disable-next-line no-console
    console.log(`server listening on ${address}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
