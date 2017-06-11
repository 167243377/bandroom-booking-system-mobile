import { LoadingController } from 'ionic-angular/components/loading/loading';
import { FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { Room } from '../../model/room';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { BookingService } from '../../services/bookingService'

import { Clipboard } from '@ionic-native/clipboard';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html'
})
export class ReceiptPage {
  private bookingData;
  private bookedRoom: Room;

  private isViewMode = false;
  private receiptNo = "";
  private pageTitle = "";

  private loadingCtr;

  private receiptNos = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private bookingService: BookingService,
    private clipboard: Clipboard,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    this.bookingData = navParams.get('bookingData');
    this.bookedRoom = navParams.get('selectedRoom');
    this.isViewMode = navParams.get('isViewMode');

    if (this.isViewMode) {
      this.receiptNo = navParams.get('receiptNo');
      this.pageTitle = "預約紀錄";
    }else{
      //new form
      this.pageTitle = "確認預約";
    }

    this.loadingCtr = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Loading...'
    });


  }

  ngOnInit() {

    if (this.isViewMode) {
      // check booking data will use this logic
      this.getBooking();
    } else {

      //get booking and room data from constructor
    }
  }

  confirmBooking() {
    this.loadingCtr.present();

    this.bookingService.createBooking(this.bookedRoom, this.bookingData).then((returnedReservationId => {

      this.loadingCtr.dismiss();

      let alert = this.alertCtrl.create({
        title: '已成功預約',
        message: '參考編號: ' + returnedReservationId.toString() + ' 以作搜尋紀錄之用途，參考編號亦可在「參考編號紀錄」頁面中尋找',
        buttons: [{
          text: '複製參考編號及確定',
          handler: () => {

            this.storage.get('receiptNos').then(val => {
                  this.receiptNos = val;

                  if(this.receiptNos == undefined || this.receiptNos == null){
                    this.receiptNos = [];
                  }

                  this.receiptNos.push(returnedReservationId);
                  this.storage.set('receiptNos', this.receiptNos);
                  
                  this.clipboard.copy(returnedReservationId.toString());
                  this.navCtrl.setRoot(TabsPage);
            })


          }
        }]
      });
      alert.present();

    })).catch((error) => {

      this.loadingCtr.dismiss();

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

  getBooking() {
    // check booking data will use this logic
    this.loadingCtr.present();

    this.bookingService.getBooking(this.receiptNo).then(response => {
      let res = <any>response;
      this.bookedRoom = res.room;
      this.bookingData = res.bookingData;

    }).catch(error => {

      let alert = this.alertCtrl.create({
        title: '查詢結果',
        message: '參考編號：' + this.receiptNo.toString() + ' 不正確',
        buttons: [{
          text: '確定',
          handler: () => {
            this.navCtrl.pop();
          }
        }]
      });
      alert.present();

    }).then(() => {
      this.loadingCtr.dismiss();
    });
  }

  backToBookform() {
    if (this.navCtrl.canGoBack) {
      this.navCtrl.pop();
    }
  }
}
