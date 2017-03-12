import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {RoomsPage} from '../rooms/rooms';
import {DatePicker, StatusBar, SQLite} from 'ionic-native';
import {RoomService} from "../../services/rooms";
import {AdvancedSearchPage} from "../advanced-search/advanced-search";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  public searchCriterias;
  private roomsPage: RoomsPage;
  private advancedSearchPage: AdvancedSearchPage;
  private storage: Storage;
  public personList: Array<Object>;



  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private roomService: RoomService,) {


    //initialize searching properties
    this.searchCriterias = {
      searchText: '',
      searchDate: new Date()
    };

    // initialize local database
    let db = new SQLite();
    db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('CREATE TABLE IF NOT EXISTS CheckedRoom(id VARCHAR(255) PRIMARY KEY, count INTEGER)', {}).then(() => {
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });

    //set status bar color
    StatusBar.overlaysWebView(true); // let status bar overlay webview
    StatusBar.backgroundColorByHexString('#A30000'); // set status bar to primary color
  }

  //functions
  onInputDate() {

    DatePicker.show({
      date: new Date(),
      mode: 'date',
      minDate: Date.now(),
      titleText: '選擇日期',
      todayText: '今天',
      androidTheme: 5  // THEME_DEVICE_DEFAULT_LIGHT = 5
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

  onGoToSearchRooms() {
    this.navCtrl.push(RoomsPage, this.searchCriterias);
  }

  onGoToAdvancedSearchPage() {
    this.navCtrl.push(AdvancedSearchPage);
  }


}
