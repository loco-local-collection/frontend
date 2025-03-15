import { list } from "radashi";
import { gen } from "../generator/gen";
import { objectToString } from "../libs/objectToString";

const main = (len: number) => {
  const instance = list(0, len - 1).map(() => gen.user.instance());
  const str = objectToString(instance);
  console.log(str);
};

main(1);
