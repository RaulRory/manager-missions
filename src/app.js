import fastify from "fastify";
import { missionRoutes } from "./routes/mission.js";

const logConfig = {
  development: {
    transport: {
      target: "pino-pretty",
      option: {
        transleteTime: "HH:MM:ss Z",
        ignore: "pid, hostname"
      }
    }
  },
  production: true,
  test: false
};

export function createInstanceApp() {
  const app = fastify({
    logger: logConfig[process.env.ENVIRONMENT || "development"]
  });

  app.register(missionRoutes, { prefix: "/api" });

  return app;
}

