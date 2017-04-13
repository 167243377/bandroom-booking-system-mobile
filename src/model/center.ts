import { Room } from "./room";
import { District } from "./district";
import { Provider } from "./provider";

export class Center {
  name: string;
  address: string;
  contactNumber: string;
  contactEmail: string;

  provider: Provider;
  rooms: Room[];
  district: District;

  lat: string;
  lng: string;

  constructor(name: string, address: string, contactNumber: string, contactEmail: string, provider: Provider, rooms: Room[], district: District, lat: string, lng: string) {
    this.name = name;
    this.address = address;
    this.contactNumber = contactNumber;
    this.contactEmail = contactEmail;
    this.provider = provider;
    this.rooms = rooms;
    this.district = district;
    this.lat = lat;
    this.lng = lng;
  }
}
