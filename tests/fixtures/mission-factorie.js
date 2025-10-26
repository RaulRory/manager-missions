import { faker } from "@faker-js/faker";
import { Mission } from "../../src/models/mission.js";

export class MissionFactorie {
  missions = [];

  createMission(params) {
    const mission =  new Mission({
      id: faker.string.uuid(),
      name: faker.book.series(),
      crew: faker.book.format(),
      spacecraft: faker.color.human(),
      destination: faker.location.city(),
      status: faker.helpers.arrayElement(["active", "completed", "failed"]),
      duration: faker.number.int({ min: 1, max: 100 }),
      ...params
    });

    this.missions.push(mission);

    return mission;
  }
}
