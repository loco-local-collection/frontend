import { list } from "radashi";
import { gen } from "../generator";
import { objectToString } from "../libs/object-to-string";

const main = (len: number) => {
  const instance = list(0, len - 1).map(() => gen.user.instance());
  const str = objectToString(instance);
  console.log(str);
};

main(1);
