import { User } from "../user/user.entity";
import { Spot } from "./spot.entity";

export interface SpotView extends Omit<Spot, "authorId"> {
  author: User;
}
