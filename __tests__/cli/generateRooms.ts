import { list } from "radashi";
import { gen } from "../generator/gen";
import { faker } from "@faker-js/faker";
import { objectToString } from "../libs/objectToString";
import { userFixtures } from "../fixtures/userFixture";

const main = (len: number) => {
  const instance = list(0, len - 1).map((i) => {
    const user = userFixtures[0];
    if (i === 1)
      return gen.room.instance({ userId: user.id, createAt: new Date() });
    if (i === 2)
      return gen.room.instance({
        userId: user.id,
        title: "000000" + faker.string.sample(),
      });

    return gen.room.instance({ userId: user.id });
  });
  const str = objectToString(instance);
  console.log(str);
};

main(14);
