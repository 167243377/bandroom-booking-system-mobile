import {DateTime} from "ionic-angular";

export class Reservation{
  id: string;
  data: Date;
  startTime: DateTime;
  endTime: DateTime;
  guestName: string;
  people: number;
}
