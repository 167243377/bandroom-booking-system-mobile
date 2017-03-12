import {Center} from "./center";
import {Reservation} from "./reservation";
import {Gear} from "./gear";

export class Room {
  center: Center;
  description: string;
  price: number;
  images: string[]; //binary
  size: string;
  gears: Gear[];
  reservations: Reservation[];

  constructor(center: Center, description: string, price: number, imgs: string[]) {
    this.center = center;
    this.description = description;
    this.price = price;
    this.images = imgs;

  }
}
