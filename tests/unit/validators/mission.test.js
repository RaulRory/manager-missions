import { beforeEach, describe, test } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";
import { validateMission, validateMissionId } from "../../../src/validators/mission.js";
import { MissionFactorie } from "../../fixtures/mission-factorie.js";

describe("Validation Mission", () => {
  let missionParams;
  const factorie = new MissionFactorie();

  beforeEach(() => {
    missionParams = factorie.createMission();
  });


  test("should validate a valid mission", () => {
    const validMission = missionParams;

    const result = validateMission(validMission);

    strictEqual(result.isValid, true);
    deepStrictEqual(result.data, validMission);
  });

  test("should reject mission with invalid status", () => {
    const invalidMission = {
      ...missionParams,
      status: "invalid-status"
    };

    const result = validateMission(invalidMission);

    strictEqual(result.isValid, false);
    strictEqual(result.errors.length, 1);
    strictEqual(result.errors[0].field, "status");
    strictEqual(result.errors[0].message, "Status must be one of: active, completed, failed");
  });

  test("should reject mission with missing required fields", () => {
    const incompleteMission = {
      name: "Apollo Mission"
    };

    const result = validateMission(incompleteMission);

    strictEqual(result.isValid, false);
    strictEqual(result.errors.length > 1, true);

    const errorFields = result.errors.map(error => error.field);
    strictEqual(errorFields.includes("id"), true);
    strictEqual(errorFields.includes("crew"), true);
    strictEqual(errorFields.includes("spacecraft"), true);
  });

  test("should reject mission with invalid UUID", () => {
    const invalidMission = {
      ...missionParams,
      id: "not-a-uuid"
    };

    const result = validateMission(invalidMission);

    strictEqual(result.isValid, false);
    strictEqual(result.errors.length, 1);
    strictEqual(result.errors[0].field, "id");
    strictEqual(result.errors[0].message, "ID must be a valid UUID");
  });

  test("should reject mission with invalid duration", () => {
    const invalidMission = {
      ...missionParams,
      duration: -5
    };

    const result = validateMission(invalidMission);

    strictEqual(result.isValid, false);
    strictEqual(result.errors.length, 1);
    strictEqual(result.errors[0].field, "duration");
    strictEqual(result.errors[0].message, "Duration must be at least 1 day");
  });

  test("should reject mission with too short name", () => {
    const invalidMission = {
      ...missionParams,
      name: "A"
    };

    const result = validateMission(invalidMission);

    strictEqual(result.isValid, false);
    strictEqual(result.errors[0].field, "name");
    strictEqual(result.errors[0].message, "Mission name must be at least 3 characters long");
  });

  test("Should validate type ID mission", () => {
    const missionIdInvalid = null;

    const result = validateMissionId(missionIdInvalid);

    strictEqual(result.isValid, false);
  });
});
