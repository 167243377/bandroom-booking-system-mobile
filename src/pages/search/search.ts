import { LoadingController } from 'ionic-angular/components/loading/loading';
import { ToastController } from 'ionic-angular/components/toast/toast';
import { District } from '../../model/district';
import { RoomType } from '../../model/roomType';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RoomsPage } from '../rooms/rooms';
import { DatePicker } from 'ionic-native';
import { RoomService } from "../../services/roomService";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  roomTypes: RoomType[] = [];
  districts: District[] = [];

  searchCriterias = {
    districtCode: '',
    roomTypeCode: '',
    people: '',
    searchDate: '',
    priceRange: {
      lower: 0,
      upper: 300,
    },
    keyboardRequired: false
  };

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private roomService: RoomService,
    private loadingCtrl: LoadingController) {
  }


  ngOnInit() { // componment Start method
    // initializing code tables
    this.roomService.getRoomTypes().then(res => {
      let roomTypes: RoomType[] = res;

      for (var i = 0; i < roomTypes.length; i++) {
        let currentRoomType = roomTypes[i];
        this.roomTypes.push(new RoomType(currentRoomType.code, currentRoomType.description));
      }

    }).catch(error => {
      this.showError(error);
    })

    this.roomService.getDistricts().then(res => {
      let districts: District[] = res;

      for (var i = 0; i < districts.length; i++) {
        let currentDistrict = districts[i];
        this.districts.push(new District(currentDistrict.code, currentDistrict.description));
      }

    }).catch(error => {
      this.showError(error);
    })

  }

  onSearchRooms() {

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading...'
    });

    // loading.present();
  this.navCtrl.push(RoomsPage);

    // this.roomService.searchRooms(this.searchCriterias).then(res => {
      // this.navCtrl.push(RoomsPage, { room: res });

    // }).catch(error => {
    //   this.showError(error);

    // }).then(() => {
    //   loading.dismiss();
    // })

  }


  showError(errorMsg: string) {
    let toast = this.toastCtrl.create({
      message: errorMsg,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

}
