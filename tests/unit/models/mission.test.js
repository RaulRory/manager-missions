import { beforeEach, describe, test }  from "node:test";
import { strictEqual, throws } from "node:assert";
import { Mission } from "../../../src/models/mission.js";
import { MissionFactorie } from "../../fixtures/mission-factorie.js";

describe("Model Mission", () => {
  const factorie = new MissionFactorie();
  let missionParams = {};

  beforeEach(() => {
    missionParams = factorie.createMission();
  });

  test("should create mission with all fields when provided", () => {
    const mission = new Mission({ ...missionParams });

    strictEqual(mission.id, missionParams.id);
    strictEqual(mission.name, missionParams.name);
    strictEqual(mission.crew, missionParams.crew);
    strictEqual(mission.spacecraft, missionParams.spacecraft);
    strictEqual(mission.destination, missionParams.destination);
    strictEqual(mission.status, missionParams.status);
    strictEqual(mission.duration, missionParams.duration);
  });

  test("should validate status field accepts valid values", () => {
    const validStatuses = ["active", "completed", "failed"];

    validStatuses.forEach(status => {
      const mission = new Mission({
        ...missionParams,
        status: status
      });

      strictEqual(mission.status, status);
    });
  });

  test("should change status with setStatus method", () => {
    const mission = new Mission({
      ...missionParams,
      status: "active"
    });
    mission.setStatus("completed");

    strictEqual(mission.status, "completed");
  });

  test("should provide helper methods for status checking", () => {
    const activeMission = new Mission({ ...missionParams, status: "active" });
    const completedMission = new Mission({ ...missionParams, status: "completed" });
    const failedMission = new Mission({ ...missionParams, status: "failed" });

    strictEqual(activeMission.isActive(), true);
    strictEqual(activeMission.isCompleted(), false);
    strictEqual(activeMission.isFailed(), false);

    strictEqual(completedMission.isActive(), false);
    strictEqual(completedMission.isCompleted(), true);
    strictEqual(completedMission.isFailed(), false);

    strictEqual(failedMission.isActive(), false);
    strictEqual(failedMission.isCompleted(), false);
    strictEqual(failedMission.isFailed(), true);
  });

  test("should throw error for invalid status", () => {
    throws(() => {
      new Mission({
        ...missionParams,
        status: "invalid-status"
      });
    }, {
      name: "Error",
      message: /Invalid status: invalid-status/
    });
  });

  test("should throw error when setting invalid status", () => {
    const mission = new Mission({
      ...missionParams,
      status: "active"
    });

    throws(() => {
      mission.setStatus("invalid");
    }, {
      name: "Error",
      message: /Invalid status: invalid/
    });
  });
});
