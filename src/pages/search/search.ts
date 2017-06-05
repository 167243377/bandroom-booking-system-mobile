import { ToastController } from 'ionic-angular/components/toast/toast';
import { District } from '../../model/district';
import { RoomType } from '../../model/roomType';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RoomsPage } from '../rooms/rooms';
import { DatePicker } from 'ionic-native';
import { RoomService } from "../../services/rooms";

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
    searchDate: new Date(),
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
    private roomService: RoomService) {
  }

  showError(errorMsg: string) {
    let toast = this.toastCtrl.create({
      message: errorMsg,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
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
        this.roomTypes.push(new RoomType(currentDistrict.code, currentDistrict.description));
      }

    }).catch(error => {
      this.showError(error);
    })

  }

  onInputDate() {
    DatePicker.show({
      date: new Date(),
      mode: 'date',
      minDate: Date.now(),
      titleText: '選擇日期',
      todayText: '今天',
      androidTheme: 5  // because THEME_DEVICE_DEFAULT_LIGHT = 5
    }).then(
      date => {
        this.searchCriterias.searchDate = date;
      },
      err => {
        console.log('Error occurred while getting date: ', err)
      });
  }

  onSearchRooms() {
    this.navCtrl.push(RoomsPage, this.searchCriterias);
  }

}
