import { ObjectId } from "mongodb";
import { describe, expect, it } from "vitest";
import { idString, refIdFilter } from "./ids";

describe("idString", () => {
  it("handles ObjectIds and the legacy string/number ids", () => {
    const id = new ObjectId();
    expect(idString(id)).toBe(id.toHexString());
    expect(idString(id.toHexString())).toBe(id.toHexString());
    expect(idString(3)).toBe("3");
    expect(idString(undefined)).toBe("");
  });
});

describe("refIdFilter", () => {
  it("matches both the ObjectId and its hex string", () => {
    const id = new ObjectId();
    expect(refIdFilter(id)).toEqual({ $in: [id, id.toHexString()] });
  });
});
