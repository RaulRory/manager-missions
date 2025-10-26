import { randomUUID } from "node:crypto";

export class Mission {
  id;
  name;
  crew;
  spacecraft;
  destination;
  status;
  duration;
  static VALID_STATUSES = ["active", "completed", "failed"];


  constructor({
    id,
    name,
    crew,
    spacecraft,
    destination,
    status,
    duration
  }) {
    this.id = id || randomUUID();
    this.name = name;
    this.crew = crew;
    this.spacecraft = spacecraft;
    this.destination = destination;
    this.status = this.#validateStatus(status);
    this.duration = duration;
  }

  #validateStatus(status) {
    if (status && !Mission.VALID_STATUSES.includes(status)) {
      throw new Error(
        `Invalid status: ${status}. Must be one of: ${Mission.VALID_STATUSES.join(", ")}`
      );
    }
    return status;
  }


  setStatus(newStatus) {
    this.status = this.#validateStatus(newStatus);
    return this;
  }

  isActive() {
    return this.status === "active";
  }

  isCompleted() {
    return this.status === "completed";
  }

  isFailed() {
    return this.status === "failed";
  }
};
