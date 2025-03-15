import { test, describe, expect } from "vitest";
import { spotFixtures } from "../../../__tests__/fixtures/spotFixture";
import { spotApi } from "./spotApi";
import { omit } from "radashi";
import { userFixtures } from "../../../__tests__/fixtures/userFixture";
import { SpotView } from "@/domains/spot/spot.type";

describe("spotApi", () => {
  test("findOne", async () => {
    const spot = spotFixtures[0];
    const author = userFixtures[0];

    const id = spot.id;
    const expected: SpotView = {
      ...omit(spot, ["authorId"]),
      author,
    };

    const response = await spotApi.findOne(id);

    expect(response.status).toEqual(200);
    if (response.status !== 200) throw new Error();
    expect(response.data.spot).toEqual(expected);
  });

  test("countAll", async () => {
    const search = spotFixtures[0].title;
    const response = await spotApi.countAll(search);

    expect(response.status).toEqual(200);
    if (response.status !== 200) throw new Error();
    expect(response.data.count).toEqual(1);
  });
});
