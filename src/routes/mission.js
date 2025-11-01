import { MissionsControler } from "../controllers/mission.js";

export async function missionRoutes(appInstance) {
  appInstance.post("/missions", MissionsControler.createMission);
  appInstance.get("/missions", MissionsControler.listAllMissions);
  appInstance.get("/missions/:id", MissionsControler.findMissionById);
}
