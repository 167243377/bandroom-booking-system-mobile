import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-bookform',
  templateUrl: 'bookform.html'
})
export class BookformPage {
  roomID: number;

  constructor(private navCtrl: NavController,
    private navParams: NavParams) {
    this.roomID = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookformPage');
  }

}
