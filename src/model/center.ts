import {Room} from "./room";
import {District} from "./district";
import {RoomType} from "./roomType";
import {Provider} from "./provider";

export class Center {
  name: string;
  address: string;
  contactNumber: string;
  contactEmail: string;

  provider: Provider;
  rooms: Room[];
  district: District;
  roomType: RoomType;

}
