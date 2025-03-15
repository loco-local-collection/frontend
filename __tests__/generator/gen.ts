import { Place } from "@/domains/place/place.entity";
import { Room } from "@/domains/room/room.entity";
import { User } from "@/domains/user/user.entity";
import { faker } from "@faker-js/faker";
import { draw } from "radashi";

const imgPath = [
  "/cafe1.png",
  "/cafe2.png",
  "/restaurant1.png",
  "/restaurant2.png",
  "/exhibit1.png",
  "/exhibit2.png",
];

export const gen = {
  img: () => draw(imgPath) as string,

  place: {
    instance: (partial?: Partial<Place>): Place => ({
      id: faker.string.uuid(),
      title: faker.book.title(),
      description: faker.word.words({ count: { min: 5, max: 25 } }),
      lat: faker.number.float(),
      lng: faker.number.float(),
      likes: faker.number.int(),
      imgUrl: gen.img(),
      createAt: faker.date.past(),
      updateAt: faker.date.past(),
      userId: faker.string.uuid(),
      roomId: faker.string.uuid(),
      ...partial,
    }),
  },

  room: {
    instance: (partial?: Partial<Room>): Room => ({
      id: faker.string.uuid(),
      label: faker.book.title(),
      title: faker.book.title(),
      description: faker.word.words({ count: { min: 5, max: 25 } }),
      isPrivate: false,
      shareLink: faker.book.title(),
      thumbnail: gen.img(),
      createAt: faker.date.past(),
      updateAt: faker.date.past(),
      userId: faker.string.uuid(),
      ...partial,
    }),
  },

  // 복잡도를 낮추기 위해 간소화함
  user: {
    instance: (partial?: Partial<User>): User => ({
      id: faker.string.uuid(),
      nickname: faker.person.firstName(),
      profileImage: gen.img(),
      ...partial,
    }),
  },
};
