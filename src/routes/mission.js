import { MissionsControler } from "../controllers/mission.js";

export async function missionRoutes(appInstance) {
  appInstance.post("/missions", MissionsControler.createMission);
}
