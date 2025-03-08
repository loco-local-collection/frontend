import { useState } from "react";

const pageInit = 1;

export const usePageLoc = () => {
  const [pageLoc, setPageLoc] = useState(1);

  const onClickPage = (page: number) => {
    setPageLoc(page);
  };

  const onSubmit = () => {
    setPageLoc(pageInit);
  };

  return {
    pageLoc,
    onClickPage,
    onSubmit,
  };
};
