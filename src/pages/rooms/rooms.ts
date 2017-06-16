
import { FilterPage } from '../filter/filter';
import { AppSettings } from '../../appSettings';
import { Component } from '@angular/core';
import { NavController, NavParams, NavOptions, ModalController, PopoverController } from 'ionic-angular';
import { RoomPage } from '../room/room';
import { Room } from "../../model/room";

@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html'
})
export class RoomsPage {
  private host = AppSettings.apiHost;
  private rooms;
  private selectedFilterValue;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController) {

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
    let filterModal = this.modalCtrl.create(FilterPage,
      {
        rooms: this.rooms,
        selectedFilterValue: this.selectedFilterValue
      },
      {
        showBackdrop: true,
        enableBackdropDismiss: true
      });

    filterModal.onDidDismiss(data => {
      this.selectedFilterValue = data.selectedFilterValue;
      console.log(this.selectedFilterValue);
    });

    filterModal.present();

  }

}
