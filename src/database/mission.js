import { database } from "./config.js";

export class MissionsDatabase {
  async insert(mission) {
    const { id, name, crew, spacecraft, destination, status, duration } = mission;

    const query = database.prepare(`
      INSERT INTO missions (id, name, crew, spacecraft, destination, status, duration) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    query.run(id, name, crew, spacecraft, destination, status, duration);

    return;
  }
}
