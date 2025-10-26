import { createInstanceApp } from "./src/app.js";
import { dbInitialization } from "./src/database/config.js";

async function start() {
  const app = createInstanceApp();

  try {
    dbInitialization();
    const address = await app.listen({ port: process.env.PORT });
    app.log.info(`API Manager Missions is up at ${address}`);
  } catch (error) {
    console.error(`Something is wrong error! ${error}
    Server is not running on port ${process.env.PORT}`);
    process.exit(1);
  }
};

start();
