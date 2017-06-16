import { ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-filter',
    templateUrl: 'filter.html'
})
export class FilterPage {
    private rooms;
    private selectedFilterValue;
    private filterOptions = ['sort_price_lowToHigh', 'sort_price_highToLow'];

    constructor(
        private viewCtrl: ViewController,
        private navParam: NavParams) {

        this.rooms = navParam.get('rooms');
        this.selectedFilterValue = navParam.get('selectedFilterValue');
        console.log(this.selectedFilterValue);
    }

    sort_price_lowToHigh() {

        this.rooms = this.rooms.sort(function (a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });

        let data = {
            selectedFilterValue: 'sort_price_lowToHigh'
        }

        this.viewCtrl.dismiss(data);
    }

    sort_price_highToLow() {

        this.rooms = this.rooms.sort(function (a, b) {
            return parseFloat(b.price) - parseFloat(a.price);
        });

        let data = {
            selectedFilterValue: 'sort_price_highToLow'
        }

        this.viewCtrl.dismiss(data);
    }
}
