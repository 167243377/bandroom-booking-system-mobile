import { Center } from "./center";
import { Reservation } from "./reservation";
import { Gear } from "./gear";
import { RoomType } from "./roomType";

export class Room {
  _id: number;
  center: Center;
  description: string;
  price: number;
  images: string[]; //binary
  size: string;
  gears: Gear[];
  reservations: Reservation[];
  roomType: RoomType;
  canTeach: boolean;
  hasKeyboard: boolean;

  constructor(center: Center, description: string, price: number, images: string[], size: string, gears: Gear[], reservations: Reservation[], roomType: RoomType, canTeach: boolean, hasKeyboard: boolean) {
    this.center = center;
    this.description = description;
    this.price = price;
    this.images = images;
    this.size = size;
    this.gears = gears;
    this.reservations = reservations;
    this.roomType = roomType;
    this.canTeach = canTeach;
    this.hasKeyboard = hasKeyboard;
  }
}
