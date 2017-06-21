import { ReceiptPage } from '../receipt/receipt';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-search-booking-records',
    templateUrl: 'search-booking-records.html'
})
export class SearchBookingRecordsPage {
    private receiptRecords = [];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private storage: Storage,
        private alertCtrl: AlertController) {

    }

    ionViewWillEnter() {
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
                    text: '取消',
                    role: 'cancel'

                },
                {
                    text: '確定',
                    handler: () => {

                        var deleteIndex = -1;

                        for (var i = 0; i < this.receiptRecords.length; i++) {
                            var currentReceiptRecord = this.receiptRecords[i];

                            console.log(currentReceiptRecord);

                            console.log(receiptRecord);

                            if (currentReceiptRecord.receiptNo == receiptRecord.receiptNo) {
                                deleteIndex = i;
                                break;
                                //deleted record found, break the loop
                            }
                        }

                        //delete the targeted record
                        //1 = delete 1 item
                        this.receiptRecords.splice(deleteIndex, 1);

                        this.storage.set('receiptRecords', this.receiptRecords).then(() => {
                            //after deleteing the record, then we refresh the list
                            this.refreshSearchData();
                        });

                    }
                }
            ]

        });
        alert.present();
    }

    deleteAllReceiptRecords() {

        if (this.receiptRecords.length > 0) {
            let alert = this.alertCtrl.create({
                title: '確認執行',
                message: '確定刪除所有預約紀錄？(紀錄將不能復完）',
                buttons: [
                    {
                        text: '取消',
                        role: 'cancel'

                    },
                    {
                        text: '確定',
                        handler: () => {
                            this.storage.remove('receiptRecords');
                            this.refreshSearchData();
                        }
                    }
                ]

            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: '確認執行',
                message: '沒有任何預約紀錄',
                buttons: [
                    {
                        text: '確定'
                    }
                ]

            });
            alert.present();
        }
    }

    getReceiptRecords() {
        this.storage.get('receiptRecords').then(val => {
            if (val == undefined || val == null) {
                this.receiptRecords = [];
            } else {
                this.receiptRecords = val;
            }
        })
    }

    refreshSearchData() {
        this.getReceiptRecords();
    }

}
