import { ReceiptPage } from '../receipt/receipt';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-search-booking-records',
    templateUrl: 'search-booking-records.html'
})
export class SearchBookingRecordsPage {
    private receiptNo: Number;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams) {

    }

    searchBookingRecords() {
        this.navCtrl.push(ReceiptPage, { receiptNo: this.receiptNo })
    }

}
