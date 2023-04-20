import { describe, it, expect } from "vitest";
import heroData from "./datasets/heroData.json";
import Hero from "./types/hero";

const createHeroGridEntryHash = (hero: Hero) => {
  return (
    hero.attribute +
    hero.lanes.join("") +
    hero.gender +
    hero.race.join("") +
    hero.complexity +
    hero.legs.toString() +
    hero.releaseYear.toString()
  );
};

describe("heroData", () => {
  it("should not contain any entries with exact matching grid categories", () => {
    const dupeMap = new Map();
    const duplicates: Hero[] = [];
    for (const hero of heroData) {
      const hash = createHeroGridEntryHash(hero);
      if (dupeMap.has(hash)) {
        duplicates.push(dupeMap.get(hash));
        duplicates.push(hero);
      }
      dupeMap.set(hash, hero);
    }
    expect(duplicates).toStrictEqual([]);
  });
});
