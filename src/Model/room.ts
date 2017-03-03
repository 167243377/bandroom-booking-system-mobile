import {Center} from "./center";

export class Room {
  center: Center;
  description: string;
  price: number;

  constructor(center: Center, description: string, price: number) {
    this.center = center;
    this.description = description;
    this.price = price;
  }
}
