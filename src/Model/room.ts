import {Center} from "./center";

export class Room {
  center: Center;
  description: string;
  price: number;
  imgs: string[];

  constructor(center: Center, description: string, price: number, imgs: string[]) {
    this.center = center;
    this.description = description;
    this.price = price;
    this.imgs = imgs;

  }
}
