import { AppSettings } from '../../appSettings';
import { RoomService } from '../../services/roomService';
import { ModalController } from 'ionic-angular';
import { Toast } from 'ionic-native/dist/esm';

import { Component, ElementRef, state, trigger, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Room } from '../../model/room';
import { BookformPage } from '../bookform/bookform';

import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-room',
    templateUrl: 'room.html'
})
export class RoomPage {
    private host = AppSettings.apiHost;
    private roomId;

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

    private eventSource;
    private viewTitle;

    private calendar = {
        // default view = week
        mode: 'week',
        currentDate: new Date()
    };

    private markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0, 0);
        return date < current;
    };

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
        this.roomService.searchRoom(this.roomId).then(res => {
            this.room = res;
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

    loadEvents() {
        this.eventSource = this.createRandomEvents();
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    changeToToday() {
        this.calendar.currentDate = new Date();
        this.changeMode('day');
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
    }

    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: '',
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            } else {

                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;

                startMinute = (date.getMinutes() + startMinute) + ((date.getMinutes() + startMinute) % 15);
                endMinute = (date.getMinutes() + endMinute) + ((date.getMinutes() + endMinute) % 15);

                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, endMinute);
                events.push({
                    title: '',
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
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
