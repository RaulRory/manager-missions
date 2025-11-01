import { database } from "./config.js";

export class MissionsDatabase {
  insert(mission) {
    const { id, name, crew, spacecraft, destination, status, duration } = mission;

    const query = database.prepare(`
      INSERT INTO missions (id, name, crew, spacecraft, destination, status, duration) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    query.run(id, name, crew, spacecraft, destination, status, duration);

    return;
  }

  select() {
    const query = database.prepare("SELECT * FROM missions");

    const result = query.all();

    return result;
  }

  selectById(id) {
    const query = database.prepare("SELECT * FROM missions WHERE id = ?");

    const result = query.get(id);

    return result;
  }
}
