import { mockServer } from "../__tests__/mock-api/mock-server";

mockServer.listen();

describe("msw", () => {
  it("get", async () => {
    const result = await fetch("http://localhost:4000/contents");
    const data = await result.json();

    console.log(data);
  });
});
