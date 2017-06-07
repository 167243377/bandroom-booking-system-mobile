import { FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { Room } from '../../model/room';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { BookingService } from '../../services/bookings'
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
    private alertCtrl: AlertController,
    private bookingService: BookingService
  ) {
    this.bookingData = navParams.get('bookingData');
    this.bookedRoom = navParams.get('selectedRoom');
    this.isViewMode = navParams.get('isViewMode');
  }

  confirmBooking() {
    console.log(this.bookingData);

    this.bookingService.createBooking(this.bookedRoom, this.bookingData).then((returnedReservationId => {

      let alert = this.alertCtrl.create({
        title: '已成功預約',
        message: '請保留參考編號: ' + returnedReservationId + ' 以作搜尋紀錄之用途',
        buttons: [{
          text: '確定',
          handler: () => {
            this.navCtrl.setRoot(TabsPage);
          }
        }]
      });
      alert.present();

    })).catch((error) => {
      let alert = this.alertCtrl.create({
        title: '何服器暫時未能預約',
        message: '請等後再試',
        buttons: [{
          text: '確定'
        }]
      });
      alert.present();
    })


  }

  backToBookform() {
    if (this.navCtrl.canGoBack) {
      this.navCtrl.pop();
    }
  }
}
