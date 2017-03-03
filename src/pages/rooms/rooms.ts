import {Component} from '@angular/core';
import {NavController, NavParams, NavOptions} from 'ionic-angular';
import {RoomPage} from '../room/room';
import {Room} from "../../Model/room";

@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html'
})
export class RoomsPage {
  roomPage: RoomPage;

  // private rooms: Room[];

  rooms = [{
    centerName: "BORN．The Music",
    description: "大房200呎",
    price: "140"
  }, {
    centerName: "BORN．The Music",
    description: "細房50呎",
    price: "100"
  }, {
    centerName: "BORN．The Music",
    description: "鼓房",
    price: "60"
  }]

  constructor(private navCtrl: NavController,
              private navParams: NavParams) {
  }

  onGoToRoomDetailPage(selectedRoom: Room) {
    debugger;
    this.navCtrl.push(RoomPage, selectedRoom);
  }
}
