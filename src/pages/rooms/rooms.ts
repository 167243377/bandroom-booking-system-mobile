import { FilterPage } from '../filter/filter';
import { AppSettings } from '../../appSettings';
import { Component } from '@angular/core';
import { NavController, NavParams, NavOptions, PopoverController } from 'ionic-angular';
import { RoomPage } from '../room/room';
import { Room } from "../../model/room";

@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html'
})
export class RoomsPage {
  private host = AppSettings.apiHost;
  private rooms;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private popoverCtrl: PopoverController) {

    this.rooms = navParams.get('rooms');
    console.log(this.rooms);
    // roomId: currentRoom._id,
    // districtDescription: currentRoomDistrict.description,
    // roomTypeDescription: currentRoomRoomType.description,
    // price: currentRoom.price
  }

  onGoToRoomDetailPage(roomId) {
    this.navCtrl.push(RoomPage, { 'roomId': roomId });
  }


  ShowFilter() {
    let popover = this.popoverCtrl.create(FilterPage);
    popover.present({
    });
  }
}
