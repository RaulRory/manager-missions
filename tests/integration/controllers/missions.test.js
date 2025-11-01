import { after, before, beforeEach, describe, test }  from "node:test";
import { deepStrictEqual } from "node:assert";
import { createInstanceApp } from "../../../src/app.js";
import { missionRoutes } from "../../../src/routes/mission.js";
import { clearMissions, dbInitialization, dropTableMission } from "../../../src/database/config.js";
import { MissionFactorie } from "../../fixtures/mission-factorie.js";
import { MissionsDatabase } from "../../../src/database/mission.js";

describe("Controllers Missions", () => {
  process.env.ENVIRONMENT = "test";
  const factorie = new MissionFactorie();
  const app = createInstanceApp();

  before(async () => {
    dbInitialization();
    await app.register(missionRoutes);
  });

  beforeEach(() => {
    clearMissions();
    factorie.missions = [];
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

  test("Should return 500 server error when database fails on POST", async () => {
    const missionData = factorie.createMission();

    const originalInsert = MissionsDatabase.prototype.insert;

    MissionsDatabase.prototype.insert = () => {
      throw new Error("Database insert failed");
    };

    const response = await app.inject({
      method: "POST",
      url: "/missions",
      payload: { ...missionData }
    });

    const responseBody = JSON.parse(response.body);

    deepStrictEqual(response.statusCode, 500);
    deepStrictEqual(responseBody.error, "An unexpected error occurred while creating the mission");

    MissionsDatabase.prototype.insert = originalInsert;
  });

  test("Should return 500 server error when database fails on GET", async () => {
    const originalSelect = MissionsDatabase.prototype.select;

    MissionsDatabase.prototype.select = () => {
      throw new Error("Database connection failed");
    };

    const response = await app.inject({
      method: "GET",
      url: "/missions"
    });

    const responseBody = JSON.parse(response.body);

    deepStrictEqual(response.statusCode, 500);
    deepStrictEqual(responseBody.error, "An unexpected error occurred while list the missions");

    MissionsDatabase.prototype.select = originalSelect;
  });

  test("Should list all the missions presents in database when was empty", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/missions"
    });

    const responseBody = JSON.parse(response.body);

    deepStrictEqual(response.statusCode, 200);
    deepStrictEqual(responseBody, { data: [] });
  });

  test("Should list all the missions presents in database", async () => {
    const missionData1 = factorie.createMission();
    const missionData2 = factorie.createMission();

    await app.inject({
      method: "POST",
      url: "/missions",
      payload: { ...missionData1 }
    });


    await app.inject({
      method: "POST",
      url: "/missions",
      payload: { ...missionData2 }
    });

    const response = await app.inject({
      method: "GET",
      url: "/missions"
    });

    const responseBody = JSON.parse(response.body);
    const expectedMissions = factorie.missions.map(mission => ({
      id: mission.id,
      name: mission.name,
      crew: mission.crew,
      spacecraft: mission.spacecraft,
      destination: mission.destination,
      status: mission.status,
      duration: mission.duration
    }));

    deepStrictEqual(response.statusCode, 200);
    deepStrictEqual(responseBody, { data: expectedMissions });
  });
});
