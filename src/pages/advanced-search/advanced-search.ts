import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RoomType} from "../../Model/roomType";
import {District} from "../../Model/district";
import {DatePicker} from "ionic-native";
import {RoomsPage} from "../rooms/rooms";

@Component({
  selector: 'page-advanced-search',
  templateUrl: 'advanced-search.html'
})
export class AdvancedSearchPage implements OnInit {
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


  ngOnInit() {
    this.roomTypes.push(new RoomType('BandRoom', 'Band房'));
    this.roomTypes.push(new RoomType('PianoRoom', '鋼琴練習房'));
    this.roomTypes.push(new RoomType('GuitarRoom', '結他練習房'));
    this.roomTypes.push(new RoomType('RehearsalRoom', '綵排房'));

    this.districts.push(new District('KLC', '九龍城'));
    this.districts.push(new District('KT', '觀塘'));
    this.districts.push(new District('YTM', '油尖旺'));
    this.districts.push(new District('SSP', '深水埗'));
    this.districts.push(new District('WTS', '黃大仙'));

    this.districts.push(new District('TW', '荃灣'));
    this.districts.push(new District('TM', '屯門'));
    this.districts.push(new District('YL', '元朗'));
    this.districts.push(new District('ISL', '離島'));
    this.districts.push(new District('KWT', '葵青'));
    this.districts.push(new District('NOR', '北區'));
    this.districts.push(new District('ST', '沙田'));
    this.districts.push(new District('TP', '大埔'));

    this.districts.push(new District('CNW', '中西區'));
    this.districts.push(new District('EAST', '東區'));
    this.districts.push(new District('SOU', '南區'));
    this.districts.push(new District('WC', '灣仔'));

  }

  constructor(private  navCtrl: NavController,
              private navParams: NavParams) {
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
      }
    )
    ;
  }

  onSearchRooms() {
    this.navCtrl.push(RoomsPage, this.searchCriterias);
  }

}
