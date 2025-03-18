"use server";

import { spotApi } from "@/effects/spotMain/spotApi.effect";

export const loadCount = async (search?: string) => {
  const response = await spotApi.countAll(search);

  return response.data.count;
};
