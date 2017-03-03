import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RoomsPage} from '../rooms/rooms';

import {DatePicker} from 'ionic-native';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  searchCriterias = {
    searchText: '',
    searchDate: ''
  };

  roomsPage: RoomsPage;

  constructor(private navCtrl: NavController,
              private navParams: NavParams) {

  }

  onInputDate() {
    debugger;
    this.searchCriterias.searchDate = new Date().toDateString();
    // console.log('onInputDate');
    // DatePicker.show({
    //   date: new Date(),
    //   mode: 'date'
    // }).then(
    //   date => console.log('Got date: ', date),
    //   err => console.log('Error occurred while getting date: ', err)
    //   );
  }

  onSearchRooms() {
    this.navCtrl.push(RoomsPage, this.searchCriterias);
  }

}
