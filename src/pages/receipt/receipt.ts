import { RoomPage } from '../room/room';
import { TabsPage } from '../tabs/tabs';
import { Room } from '../../model/room';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlertController, LoadingController } from 'ionic-angular';
import { BookingService } from '../../services/bookingService'

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html'
})
export class ReceiptPage {
  private bookingData;
  private bookedRoom: Room;
  private startDateTime;
  private endDateTime;
  private totalAmount;

  private isViewMode = false;
  private receiptNo = "";
  private pageTitle = "";

  private loadingCtr;

  private receiptRecords = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private bookingService: BookingService,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    this.bookingData = navParams.get('bookingData');
    this.bookedRoom = navParams.get('selectedRoom');
    this.totalAmount = navParams.get('totalAmount');
    this.isViewMode = navParams.get('isViewMode');

    if (this.isViewMode) {
      this.receiptNo = navParams.get('receiptNo');
      this.pageTitle = "預約紀錄";
    } else {
      //new form
      this.pageTitle = "確認預約";
      console.log("asdasD");
      console.log(this.bookingData);
      this.startDateTime = this.getTimeString(this.bookingData.startDateTime);
      this.endDateTime = this.getTimeString(this.bookingData.endDateTime);
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

    this.bookingService.createBooking(this.bookedRoom, this.totalAmount, this.bookingData).then((returnedReservationId => {

      this.loadingCtr.dismiss();

      let alert = this.alertCtrl.create({
        title: '已成功預約',
        message: '參考編號: ' + returnedReservationId.toString() + ' 以作搜尋紀錄之用途，參考編號可在「預約紀錄」頁面中尋找',
        buttons: [{
          text: '確定',
          handler: () => {

            this.storage.get('receiptRecords').then(val => {

              //get records from local storage

              if (val == undefined || val == null) {
                this.receiptRecords = [];
              } else {
                this.receiptRecords = val;
              }

              //create a new receipt record and push into the storage arrary

              var receiptRecord = {
                receiptNo: returnedReservationId.toString(),
                data: {
                  bookDate: this.bookingData.bookDate,
                  totalAmount: this.totalAmount,
                  startDateTime: this.getTimeString(this.bookingData.startDateTime),
                  endDateTime: this.getTimeString(this.bookingData.endDateTime)
                }
              }

              this.receiptRecords.unshift(receiptRecord);
              //unshift = append the record to the beginning of the arrary, because latest booking must show first
              this.storage.set('receiptRecords', this.receiptRecords);

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
      this.totalAmount = res.totalAmount;
      this.bookingData = res.bookingData;

      this.startDateTime = this.getTimeString(this.bookingData.startDateTime);
      this.endDateTime = this.getTimeString(this.bookingData.endDateTime);

      console.log(this.bookedRoom.center);

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

  viewRoom() {
    console.log(this.bookedRoom);
    this.navCtrl.push(RoomPage, { 'roomId': this.bookedRoom._id });
  }

  getTimeString(dateTime) {
    //Convert 24 format to 12

    var hh = parseInt(dateTime.split(':')[0]);
    var dd = "AM";
    var h = hh;

    if (h >= 12) {
      h = hh - 12;
      dd = "PM";
    }
    if (h == 0) {
      h = 12;
    }

    return h + ':' + dateTime.split(':')[1] + " " + dd
  }
}
