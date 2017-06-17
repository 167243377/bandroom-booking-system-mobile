import { AlertController } from 'ionic-angular';
import { District } from '../../model/district';
import { RoomType } from '../../model/roomType';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RoomsPage } from '../rooms/rooms';
import { RoomService } from "../../services/roomService";

@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage {
    private minDate;
    private maxDate;
    roomTypes: RoomType[] = [];
    districts: District[] = [];

    public searchCriterias;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private toastCtrl: ToastController,
        private roomService: RoomService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController) {

        this.initializeSearchCriteria();

        this.minDate = new Date();
        this.minDate = this.minDate.getFullYear()
            + '-' + ('0' + (this.minDate.getMonth() + 1)).slice(-2)
            + '-' + ('0' + this.minDate.getDate()).slice(-2)

        this.maxDate = new Date();
        this.maxDate.setDate(new Date().getDate() + 14);
        this.maxDate = this.maxDate.getFullYear()
            + '-' + ('0' + (this.maxDate.getMonth() + 1)).slice(-2)
            + '-' + ('0' + this.maxDate.getDate()).slice(-2)
    }


    ngOnInit() { // componment Start method
        // initializing code tables
        this.roomService.getRoomTypes().then(res => {
            let roomTypes: RoomType[] = res;

            for (var i = 0; i < roomTypes.length; i++) {
                let currentRoomType = roomTypes[i];
                this.roomTypes.push(new RoomType(currentRoomType.code, currentRoomType.description));
            }

        }).catch(error => {
            this.showError(error);
        })

        this.roomService.getDistricts().then(res => {
            let districts: District[] = res;

            for (var i = 0; i < districts.length; i++) {
                let currentDistrict = districts[i];
                this.districts.push(new District(currentDistrict.code, currentDistrict.description));
            }

        }).catch(error => {
            this.showError(error);
        })

    }

    onSearchRooms() {

        let loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Loading...'
        });

        loading.present();
        // this.navCtrl.push(RoomsPage);

        this.roomService.searchRooms(this.searchCriterias).then(res => {

            if (this.isAnyResultReturned(res)) {

                this.navCtrl.push(RoomsPage, { rooms: res });

            } else {

                let alert = this.alertCtrl.create({
                    title: '搜尋結果',
                    message: '沒有任何合適房間，建議擴闊搜尋範圍',
                    buttons: [{
                        text: '確定'
                    }]
                });
                alert.present();
            }

        }).catch(error => {

            this.showError(error);

        }).then(() => {
            loading.dismiss();
        })

    }

    initializeSearchCriteria() {
        this.searchCriterias = {
            districtCode: '',
            roomTypeCode: '',
            people: '',
            searchDate: '',
            priceRange: {
                lower: 0,
                upper: 300,
            },
            canUseAsTeaching: false,
            keyboardRequired: false
        };
    }

    showError(errorMsg: string) {
        let toast = this.toastCtrl.create({
            message: errorMsg,
            duration: 3000,
            position: 'bottom'
        });

        toast.present();
    }

    isAnyResultReturned(apiResponse): boolean {

        if (apiResponse !== null && apiResponse !== undefined) {
            if (apiResponse.length > 0) {//how many records returned from rest api
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
