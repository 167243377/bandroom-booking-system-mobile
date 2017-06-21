import { AppSettings } from '../../appSettings';
import { RoomService } from '../../services/roomService';
import { FilterPage } from '../filter/filter';
import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  NavOptions,
  NavParams,
  PopoverController,
  ToastController
} from 'ionic-angular';
import { RoomPage } from '../room/room';
import { Room } from "../../model/room";

@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html'
})
export class RoomsPage {
  private host;
  private rooms;
  private searchCriterias;
  private selectedSortingOption;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private roomService: RoomService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private appSettings: AppSettings) {

    this.rooms = navParams.get('rooms');
    this.searchCriterias = navParams.get('searchCriterias');
    this.appSettings.getServerHost().then(val => {
      this.host = val;
    })
  }

  onGoToRoomDetailPage(roomId) {
    this.navCtrl.push(RoomPage, { 'roomId': roomId });
  }

  onSearchRooms(refresher) {
    this.appSettings.getServerHost().then(val => {
      this.host = val;
      //refresh the host for showing pictures
    }).then(() => {
      this.roomService.searchRooms(this.searchCriterias).then(res => {

        if (this.isAnyResultReturned(res)) {
          this.rooms = res;
        }

      }).catch(error => {

        this.showError(error);

      }).then(() => {
        refresher.complete();
      })
    })


  }

  showError(errorMsg: string) {
    let toast = this.toastCtrl.create({
      message: errorMsg,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
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
      this.selectedSortingOption = data.selectedSortingOption;
    });

    filterModal.present();

  }

  isAnyResultReturned(apiResponse): boolean {

    if (apiResponse !== null && apiResponse !== undefined) {
      if (apiResponse.length > 0) {//how many records returned from rest api
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


}
