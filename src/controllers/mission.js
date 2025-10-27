import { validateMission } from "../validators/mission.js";
import { Mission } from "../models/mission.js";
import { MissionsDatabase } from "../database/mission.js";

export class MissionsControler {
  static async createMission(request, reply) {
    try {
      const { body } = request;

      const validation = validateMission(body);

      if (!validation.isValid) {
        return reply.code(400).send({
          error: "Validation failed",
          details: validation.errors
        });
      }


      const mission = new Mission(validation.data);
      const database = new MissionsDatabase();
      database.insert(mission);


      return reply.code(201).send({
        message: "Mission created successfully",
        data: { ...mission }
      });
    } catch (error) {
      request.log.error(error);

      return reply.code(500).send({
        error: "An unexpected error occurred while creating the mission"
      });
    }
  }

  static async listAllMissions(request, reply) {
    try {
      const database = new MissionsDatabase();
      const listtheMission = await database.select();


      return reply.code(200).send({
        data: listtheMission
      });

    } catch (error) {
      request.log.error(error);
      
      return reply.code(500).send({
        error: "An unexpected error occurred while list the missions"
      });
    }
  }
};
