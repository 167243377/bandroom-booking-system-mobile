import { ReceiptPage } from '../receipt/receipt';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-search-booking-records',
    templateUrl: 'search-booking-records.html'
})
export class SearchBookingRecordsPage {
    private receiptRecords = [
        {
            receiptNo: "wokdowkm25wdwk",
            data: {
                bookDate: "2017-06-10",
                startDateTime: "15:00",
                endDateTime: "17:00"
            }
        }, {
            receiptNo: "7xqk1owq25wdwk",
            data: {
                bookDate: "2017-06-13",
                startDateTime: "19:00",
                endDateTime: "21:00"
            }
        }
    ];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private storage: Storage,
        private alertCtrl: AlertController) {

    }

    ngOnInit() {
        this.getReceiptRecords();
    }

    checkReceiptDetail(receiptRecord) {
        this.navCtrl.push(ReceiptPage, {
            isViewMode: true,
            receiptNo: receiptRecord.receiptNo
        })
    }

    deleteReceiptRecord(receiptRecord) {
        let alert = this.alertCtrl.create({
            title: '確認執行',
            message: '確定刪除預約紀錄？(紀錄將不能復完）',
            buttons: [
                {
                    text: '確定',
                    handler: () => {
                        delete this.receiptRecords[receiptRecord.receiptNo]
                        this.storage.set('receiptRecords', this.receiptRecords);
                        this.refreshSearchData();
                    }
                },
                {
                    text: '取消',
                    role: 'cancel'

                }
            ]

        });
        alert.present();
    }

    deleteAllReceiptRecords() {
        let alert = this.alertCtrl.create({
            title: '確認執行',
            message: '確定刪除所有預約紀錄？(紀錄將不能復完）',
            buttons: [
                {
                    text: '確定',
                    handler: () => {
                        this.storage.remove('receiptRecords');
                        this.refreshSearchData();
                    }
                },
                {
                    text: '取消',
                    role: 'cancel'

                }
            ]

        });
        alert.present();

    }

    getReceiptRecords() {
        this.storage.get('receiptRecords').then(val => {
            this.receiptRecords = val;
        })
    }

    refreshSearchData() {
        this.getReceiptRecords();
    }

}
