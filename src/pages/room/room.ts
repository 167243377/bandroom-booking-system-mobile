import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides} from 'ionic-angular';
import {Room} from '../../Model/room';

@Component({
  selector: 'page-room',
  templateUrl: 'room.html'
})
export class RoomPage {
  @ViewChild(Slides) slides: Slides; // get component to a componment have to use @ViewChild
  private room: Room;


  constructor(private navCtrl: NavController,
              private navParams: NavParams) {
    debugger;
    this.room = <Room>navParams.data;
  }
}
