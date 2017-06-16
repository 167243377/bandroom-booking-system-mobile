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
  private selectedSortingOption;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController) {

    this.rooms = navParams.get('rooms');
  }

  onGoToRoomDetailPage(roomId) {
    this.navCtrl.push(RoomPage, { 'roomId': roomId });
  }


  ShowFilter() {
    let filterModal = this.modalCtrl.create(FilterPage,
      {
        rooms: this.rooms,
        selectedSortingOption: this.selectedSortingOption
      },
      {
        showBackdrop: true,
        enableBackdropDismiss: true
      });

    filterModal.onDidDismiss(data => {
      this.selectedSortingOption = data.selectedFilterValue;
    });

    filterModal.present();

  }

}
