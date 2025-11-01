import { validateMission, validateMissionId, validateMissionUpdate } from "../validators/mission.js";
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
      const listtheMission = database.select();

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

  static async findMissionById(request, reply) {
    try {
      const params = validateMissionId(request.params.id);

      if(!params.isValid) {
        return reply.code(400).send({
          error: "Something it's wrongs while find the mission"
        });
      };

      const database = new MissionsDatabase();
      const mission = database.selectById(params.data);

      return reply.code(200).send({
        data: mission || []
      });
    } catch (error) {
      request.log.error(error);

      return reply.code(500).send({
        error: "An unexpected error occurred when find the missions"
      });
    }
  }

  static async updateMission(request, reply) {
    try {
      const params = validateMissionId(request.params.id);
      const validationBody = validateMissionUpdate(request.body);

      if(!params.isValid) {
        return reply.code(400).send({
          error: "Something it's wrongs while update the mission"
        });
      };

      if(!validationBody.isValid) {
        return reply.code(400).send({
          error: "Validation failed",
          details: validationBody.errors
        });
      };

      const database = new MissionsDatabase();
      const missionExists = database.selectById(params.data);

      if(!missionExists) {
        return reply.code(400).send({
          message: "Something is wrong mission not exists!"
        });
      };

      const missionUpdated = database.update(params.data, validationBody.data);

      return reply.code(204).send({
        data: missionUpdated
      });
    } catch (error) {
      request.log.error(error);

      return reply.code(500).send({
        error: "An unexpected error occurred when updating the mission"
      });
    }
  }
};
