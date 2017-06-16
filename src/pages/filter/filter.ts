import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-filter',
    templateUrl: 'filter.html'
})
export class FilterPage {
    constructor(private viewCtrl: ViewController) { }

    close() {
        this.viewCtrl.dismiss();
    }
}
