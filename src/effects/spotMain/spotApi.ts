import { SpotView } from "@/domains/spot/spot.type";
import { jsonDateParser } from "json-date-parser";
import qs from "qs";

export const spotApi = {
  async countAll(search?: string): Promise<{
    data: {
      count: number;
    };
    status: 200;
  }> {
    const relative = search
      ? `/api/v1/spot/count?` + qs.stringify({ search })
      : `/api/v1/spot/count`;

    const url = process.env.NEXT_PUBLIC_API_BASE_URL + relative;
    const data = await fetch(url);
    const text = await data.text();

    const json = JSON.parse(text, jsonDateParser);

    return json;
  },

  async findOne(
    id: string,
  ): Promise<{ data: { spot: SpotView }; status: 200 } | { status: 404 }> {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/spot/${id}`;
    const data = await fetch(url);
    const text = await data.text();

    const json = JSON.parse(text, jsonDateParser);

    return json;
  },
};
