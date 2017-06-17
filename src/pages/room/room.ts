import { AppSettings } from '../../appSettings';
import { RoomService } from '../../services/roomService';
import { ModalController } from 'ionic-angular';
import { Toast } from 'ionic-native/dist/esm';

import { Component, ElementRef, state, trigger, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Room } from '../../model/room';
import { BookformPage } from '../bookform/bookform';

import { Storage } from '@ionic/storage';

import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns'

import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    selector: 'page-room',
    templateUrl: 'room.html'
})
export class RoomPage {
    private host = AppSettings.apiHost;
    private roomId;
    private events: CalendarEvent[];

    private room = {
        center: {
            name: "",
            address: "",
            contactNumber: "",
            district: {
                code: "",
                description: "",
            },
            lat: "",
            lngi: "",
            nonAvailablePeriod: "",
        },
        description: "",
        price: "",
        images: [],
        gears: [],
        roomType: {
            code: "",
            description: "",
        },
        canTeach: false,
        hasKeyboard: false,
        roomNonAvailablePeriod: "",
        businessHours: "",
    }

    private isShowCalendar = false;
    private isShowGears = false;
    private isFavorite = false;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private modalCtrl: ModalController,
        private roomService: RoomService,
        private storage: Storage) {

        this.roomId = navParams.get('roomId');
        // this.loadEvents();
    }

    ngOnInit() {
        //get room detail
        this.roomService.searchRoom(this.roomId).then(res => {
            this.room = res;

            console.log(this.room.bookedPeriods);

            // this.room.bookedPeriods.map(bookedPeriod =>{

            //     let bookedEvent = {
            //         start: new Date(bookedPeriod.startDateTime),
            //         end: new Date(bookedPeriod.endDateTime),
            //         title: 'booked',
            //         color: colors.red
            //     }

            //     this.events.push(bookedEvent);
            // })
        }).catch(err => {

            var alert = this.alertCtrl.create({
                message: err,
                // message: "何服器暫時未能提供服務，請稍後再試",
                buttons: [{
                    text: '確定',
                }]
            });

            alert.present();
        })

        // set favorite
        this.checkIsFavorite().then(isFavorite => {
            this.isFavorite = isFavorite;
        })
    }

    checkIsFavorite(): Promise<boolean> {
        return this.storage.get('favorites').then(val => {
            var favoriteList: string[];

            if (val == undefined || val == null) {
                return false;
            } else {
                favoriteList = <string[]>val;

                if (favoriteList.indexOf(this.roomId) == -1) {
                    //  -1 means that the roomid is not found
                    return false;
                } else {
                    //found in favorite list,
                    return true;
                }
            }
        });
    }

    setFavorite() {
        this.storage.get('favorites').then(val => {
            var favoriteList: string[];

            if (val == undefined || val == null) {
                favoriteList = [];
            } else {
                favoriteList = <string[]>val;
            }

            if (this.isFavorite) {
                //then we remove the favorite
                favoriteList.splice(favoriteList.indexOf(this.roomId), 1);
                this.storage.set('favorites', favoriteList);
            } else {
                //then we add to favorite

                favoriteList.push(this.roomId);

                this.storage.set('favorites', favoriteList);
            }
        }).then(() => {
            this.checkIsFavorite().then(isFavorite => {
                this.isFavorite = isFavorite;
            })
        })
    }

    bookNow() {
        this.navCtrl.push(BookformPage, { room: this.room });
    }
    showCalendar() {
        this.isShowCalendar = !this.isShowCalendar;
    }
    showGears() {
        this.isShowGears = !this.isShowGears;
    }
}
