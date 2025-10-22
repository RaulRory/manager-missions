import { DatabaseSync } from "node:sqlite";

export const database = new DatabaseSync(":memory");
