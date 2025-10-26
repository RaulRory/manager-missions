import { after, before, describe, test }  from "node:test";
import { deepStrictEqual } from "node:assert";
import { createInstanceApp } from "../../../src/app.js";
import { missionRoutes } from "../../../src/routes/mission.js";
import { dbInitialization, dropTableMission } from "../../../src/database/config.js";
import { MissionFactorie } from "../../fixtures/mission-factorie.js";

describe("Controllers Missions", () => {
  process.env.ENVIRONMENT = "test";
  const factorie = new MissionFactorie();
  const app = createInstanceApp();

  before(async () => {
    dbInitialization();
    await app.register(missionRoutes);
  });

  after(() => {
    dropTableMission();
  });

  test("Should create a mission with valid data", async () => {
    const missionData = factorie.createMission();

    const response = await app.inject({
      method: "POST",
      url: "/missions",
      payload: {
        ...missionData
      }
    });

    const responseBody = JSON.parse(response.body);

    deepStrictEqual(response.statusCode, 201);
    deepStrictEqual(responseBody.message, "Mission created successfully");
    deepStrictEqual(responseBody.data.id, missionData.id);
  });

  test("Should reject mission with invalid data", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/missions",
      payload: {
        name: "A",
        status: "invalid-status"
      }
    });

    const responseBody = JSON.parse(response.body);

    deepStrictEqual(response.statusCode, 400);
    deepStrictEqual(responseBody.error, "Validation failed");
  });

  test("Should return 500 server error when database fails", async () => {
    const missionData = factorie.createMission();

    await app.inject({
      method: "POST",
      url: "/missions",
      payload: { ...missionData }
    });

    const response = await app.inject({
      method: "POST",
      url: "/missions",
      payload: {
        ...missionData
      }
    });

    const responseBody = JSON.parse(response.body);

    deepStrictEqual(response.statusCode, 500);
    deepStrictEqual(responseBody.error, "An unexpected error occurred while creating the mission");
  });
});
