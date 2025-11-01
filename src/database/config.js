import { DatabaseSync } from "node:sqlite";

export const database = new DatabaseSync(":memory:");

const queryMission = `
CREATE TABLE missions (
    id text PRIMARY KEY NOT NULL,
    name text NOT NULL,
    crew text NOT NULL,
    spacecraft text NOT NULL,
    destination text NOT NULL,
    status text NOT NULL,
    duration integer NOT NULL 
)`;

function createTableMission() {
  return database.exec(queryMission);
}

export function dropTableMission() {
  return database.exec("DROP TABLE IF EXISTS missions");
}

export function clearMissions() {
  return database.exec("DELETE FROM missions");
}

export function dbInitialization() {
  console.info("Table Mission is send to create");
  createTableMission();
  console.info("Table Mission is created with success");
  return;
}
