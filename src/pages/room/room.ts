import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Room} from '../../Model/room';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html'
})
export class RoomPage {
  private room: Room;

  constructor(private navCtrl: NavController,
              private navParams: NavParams) {
    this.room = <Room>navParams.data;
  }
}
