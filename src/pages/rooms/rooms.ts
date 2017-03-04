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

  rooms = [{
    centerName: "BORN．The Music",
    description: "大房",
    price: "140",
    imgs: ["http://www.zuk-studio.com/_rehearsal/_image/room_f.jpg", "http://www.zuk-studio.com/_rehearsal/_image/room_d.jpg"]
  }, {
    centerName: "SAW MUSIC",
    description: "Bandroom",
    price: "100",
    imgs: ["https://media2.88db.com.hk/DB88UploadFiles/2012/08/29/0133DDD7-88F2-4727-89C9-66B5C50CB9C9.jpg"]
  }]

  constructor(private navCtrl: NavController,
              private navParams: NavParams) {
  }

  onGoToRoomDetailPage(selectedRoom: Room) {
    debugger;
    console.log(this.rooms[0].imgs[0].toString());
    this.navCtrl.push(RoomPage, selectedRoom);
  }
}
