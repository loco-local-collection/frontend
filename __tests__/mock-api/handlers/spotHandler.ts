// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import { spotFixtures } from "../../fixtures/spotFixture";
import { userFixtures } from "../../fixtures/userFixture";
import { SpotView } from "@/domains/spot/spot.type";
import { omit } from "radashi";

export const spotHandlers = [
  http.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/spot/count",
    ({ request }) => {
      const url = new URL(request.url);
      const search = url.searchParams.get("search");

      const filtered = search
        ? spotFixtures.filter((c) => c.title.includes(search))
        : spotFixtures;

      const count = filtered.length;

      return HttpResponse.json({
        data: { count },
        status: 200,
      });
    },
  ),

  http.get(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/spot/:id",
    ({ params }) => {
      const { id } = params;
      if (typeof id !== "string")
        return HttpResponse.json({
          status: 400,
        });

      const found = spotFixtures.find((c) => c.id === id);
      if (!found)
        return HttpResponse.json({
          status: 404,
        });

      const author = userFixtures.find((c) => c.id === found.authorId);

      if (!author) throw new Error();

      const spot: SpotView = {
        ...omit(found, ["authorId"]),
        author,
      };

      return HttpResponse.json({
        data: { spot },
        status: 200,
      });
    },
  ),
];
