import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RoomsPage} from '../rooms/rooms';
import {DatePicker} from 'ionic-native';
import {RoomService} from "../../services/rooms";
import {AdvancedSearchPage} from "../advanced-search/advanced-search";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  searchCriterias = {
    searchText: '',
    searchDate: new Date()
  };

  roomsPage: RoomsPage;
  advancedSearchPage: AdvancedSearchPage;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private roomService: RoomService) {

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

  onGoToAdvancedSearchPage() {
    this.navCtrl.push(AdvancedSearchPage);
  }

}
