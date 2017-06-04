import { TabsPage } from '../tabs/tabs';
import { Room } from '../../model/room';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

/*
  Generated class for the ReceiptPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html'
})
export class ReceiptPage {
  private bookingData;
  private bookedRoom: Room;

  private isViewMode = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.bookingData = navParams.get('bookingData');
    this.bookedRoom = navParams.get('selectedRoom');
    this.isViewMode = navParams.get('isViewMode');
  }

  confirmBooking() {
    let alert = this.alertCtrl.create({
      title: '已成功預約',
      message: '',
      buttons: [{
        text: '確定',
        handler: () => {
          this.navCtrl.setRoot(TabsPage);
        }
      }]
    });
    alert.present();
  }

  backToBookform() {
    if (this.navCtrl.canGoBack) {
      this.navCtrl.pop();
    }
  }
}
