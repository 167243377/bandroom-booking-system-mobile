import { ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-filter',
    templateUrl: 'filter.html'
})
export class FilterPage {
    private rooms;
    private selectedSortingOption;

    constructor(
        private viewCtrl: ViewController,
        private navParam: NavParams) {

        this.rooms = navParam.get('rooms');
        this.selectedSortingOption = navParam.get('selectedSortingOption');
    }

    sort_price_lowToHigh() {

        this.rooms = this.rooms.sort(function (a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });

        let data = {
            selectedSortingOption: 'sort_price_lowToHigh'
        }

        this.viewCtrl.dismiss(data);
    }

    sort_price_highToLow() {

        this.rooms = this.rooms.sort(function (a, b) {
            return parseFloat(b.price) - parseFloat(a.price);
        });

        let data = {
            selectedSortingOption: 'sort_price_highToLow'
        }

        this.viewCtrl.dismiss(data);
    }

    sort_size_lowToHigh() {

        this.rooms = this.rooms.sort(function (a, b) {
            return parseFloat(a.size) - parseFloat(b.size);
        });

        let data = {
            selectedSortingOption: 'sort_size_lowToHigh'
        }

        this.viewCtrl.dismiss(data);
    }

    sort_size_highToLow() {

        this.rooms = this.rooms.sort(function (a, b) {
            return parseFloat(b.size) - parseFloat(a.size);
        });

        let data = {
            selectedSortingOption: 'sort_size_highToLow'
        }

        this.viewCtrl.dismiss(data);
    }
}
