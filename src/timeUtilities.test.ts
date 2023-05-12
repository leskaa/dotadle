import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getAnswerIndexToday, getTimeUntilNextQuestion } from "./timeUtilities";
import { Temporal } from "@js-temporal/polyfill";

describe("timeUtilities getAnswerIndexToday", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should return 0 for 2023-04-12 at 11:59PM CST", () => {
    vi.setSystemTime(
      Temporal.ZonedDateTime.from({
        year: 2023,
        month: 4,
        day: 12,
        hour: 23,
        minute: 59,
        timeZone: "America/Chicago",
      }).toInstant().epochMilliseconds
    );
    const dayIndex = getAnswerIndexToday();
    expect(dayIndex).toBe(0);
  });
  it("should return 1 for 2023-04-13 at 12:00AM CST", () => {
    vi.setSystemTime(
      Temporal.ZonedDateTime.from({
        year: 2023,
        month: 4,
        day: 13,
        hour: 0,
        timeZone: "America/Chicago",
      }).toInstant().epochMilliseconds
    );
    const dayIndex = getAnswerIndexToday();
    expect(dayIndex).toBe(1);
  });
  it("should return 0 for 2023-04-12 at 9:59pm PST", () => {
    vi.setSystemTime(
      Temporal.ZonedDateTime.from({
        year: 2023,
        month: 4,
        day: 12,
        hour: 21,
        minute: 59,
        timeZone: "America/Los_Angeles",
      }).toInstant().epochMilliseconds
    );
    const dayIndex = getAnswerIndexToday();
    expect(dayIndex).toBe(0);
  });
  it("should return 1 for 2023-04-12 at 10:00PM PST", () => {
    vi.setSystemTime(
      Temporal.ZonedDateTime.from({
        year: 2023,
        month: 4,
        day: 12,
        hour: 22,
        timeZone: "America/Los_Angeles",
      }).toInstant().epochMilliseconds
    );
    const dayIndex = getAnswerIndexToday();
    expect(dayIndex).toBe(1);
  });
  it("should return 0 for 2023-04-13 at 12:59AM EST", () => {
    vi.setSystemTime(
      Temporal.ZonedDateTime.from({
        year: 2023,
        month: 4,
        day: 13,
        hour: 0,
        minute: 59,
        timeZone: "America/New_York",
      }).toInstant().epochMilliseconds
    );
    const dayIndex = getAnswerIndexToday();
    expect(dayIndex).toBe(0);
  });
  it("should return 1 for 2023-04-13 at 1:00AM EST", () => {
    vi.setSystemTime(
      Temporal.ZonedDateTime.from({
        year: 2023,
        month: 4,
        day: 13,
        hour: 1,
        timeZone: "America/New_York",
      }).toInstant().epochMilliseconds
    );
    const dayIndex = getAnswerIndexToday();
    expect(dayIndex).toBe(1);
  });
  it("should return 123 for 2023-08-13 at 12:00PM CST", () => {
    vi.setSystemTime(
      Temporal.ZonedDateTime.from({
        year: 2023,
        month: 8,
        day: 13,
        hour: 12,
        timeZone: "America/Chicago",
      }).toInstant().epochMilliseconds
    );
    const dayIndex = getAnswerIndexToday();
    expect(dayIndex).toBe(123);
  });
});

describe("timeUtilities getTimeUntilNextQuestion", () => {
  it("should return 23:59:59 for 2023-04-13 at 12:00:01AM CST", () => {
    vi.setSystemTime(
      Temporal.ZonedDateTime.from({
        year: 2023,
        month: 4,
        day: 13,
        second: 1,
        timeZone: "America/Chicago",
      }).toInstant().epochMilliseconds
    );
    const timeUntilNextQuestion = getTimeUntilNextQuestion(1);
    expect(timeUntilNextQuestion).toBe("23:59:59");
  });
  it("should return 01:00:01 for 2023-04-13 at 10:59:59PM CST", () => {
    vi.setSystemTime(
      Temporal.ZonedDateTime.from({
        year: 2023,
        month: 4,
        day: 13,
        hour: 22,
        minute: 59,
        second: 59,
        timeZone: "America/Chicago",
      }).toInstant().epochMilliseconds
    );
    const timeUntilNextQuestion = getTimeUntilNextQuestion(1);
    expect(timeUntilNextQuestion).toBe("01:00:01");
  });
  it("should return NOW for past question index", () => {
    vi.setSystemTime(
      Temporal.ZonedDateTime.from({
        year: 2023,
        month: 4,
        day: 13,
        minute: 1,
        timeZone: "America/Chicago",
      }).toInstant().epochMilliseconds
    );
    const timeUntilNextQuestion = getTimeUntilNextQuestion(0);
    expect(timeUntilNextQuestion).toBe("NOW");
  });
});
