import { describe, expect, it } from "vitest";
import ratioCalculator from "./ratioCalculator";

describe("with ratio calculator", () => {
  describe("when given a ratio wider than tall", () => {
    const width = 2;
    const height = 1;

    it("can calculate the new size", () => {
      const subject = ratioCalculator({ width, height });
      expect(subject({ width: 2, height: 1 })).toEqual({ width: 2, height: 1 });
      expect(subject({ width: 1, height: 2 })).toEqual({ width: 4, height: 2 });
    });
  });

  describe("when given a ratio taller than wide", () => {
    const width = 2;
    const height = 4;

    it("can calculate the new size", () => {
      const subject = ratioCalculator({ width, height });
      expect(subject({ width: 4, height: 2 })).toEqual({ width: 4, height: 2 });
      expect(subject({ width: 2, height: 4 })).toEqual({ width: 2, height: 4 });
    });
  });

  describe("when given an afghan square ratio", () => {
    const width = 34;
    const height = 27;

    it("extends a 32x32 image correctly", () => {
      const subject = ratioCalculator({ width, height });
      expect(subject({ width: 32, height: 32 })).toEqual({
        width: 40,
        height: 32,
      });
    });
  });
});
