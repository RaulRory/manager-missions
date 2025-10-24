import { createInstanceApp } from "./src/app.js";
import { dbInitialization } from "./src/database/config.js";

function start() {
  const app = createInstanceApp();

  try {
    app.listen({ port: process.env.PORT });
    dbInitialization();
  } catch (error) {
    console.error(`Something is wrong error! ${error}
    Sever is not runnig on port ${process.env.PORT}`);
  }
};

start();
