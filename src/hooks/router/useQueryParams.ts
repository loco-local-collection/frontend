import { useRouter } from "next/router";

export const useQueryParams = () => {
  const { query } = useRouter();
  return query;
};
