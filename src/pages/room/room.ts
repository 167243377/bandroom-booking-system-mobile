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
    private events: CalendarEvent[] = [];
    public defaultStartDate: Date;

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
            nonAvailablePeriod: [],
            businessHours: {
                monday: {
                    isOpen: true,
                    startTime: "10:00",
                    endTime: "00:00"
                }, tuesday: {
                    isOpen: true,
                    startTime: "10:00",
                    endTime: "00:00"
                }, wednesday: {
                    isOpen: true,
                    startTime: "10:00",
                    endTime: "00:00"
                }, thursday: {
                    isOpen: true,
                    startTime: "10:00",
                    endTime: "00:00"
                }, friday: {
                    isOpen: true,
                    startTime: "10:00",
                    endTime: "00:00"
                }, saturday: {
                    isOpen: true,
                    startTime: "10:00",
                    endTime: "00:00"
                }, sunday: {
                    isOpen: true,
                    startTime: "10:00",
                    endTime: "00:00"
                }
            }
        },
        description: "",
        price: "",
        images: [],
        gears: [],
        roomType: {
            code: "",
            description: "",
        },
        bookedPeriods: [],
        canTeach: false,
        hasKeyboard: false,
        roomNonAvailablePeriod: []
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

        // if (navParams.get('searchDate') !== "") {
        //     this.defaultStartDate = new Date(navParams.get('searchDate'));
        // } else {
        //     this.defaultStartDate = new Date();
        //     this.defaultStartDate.setHours(0, 0, 0, 0);
        // }
    }

    ngOnInit() {
        //get room detail
        this.roomService.searchRoom(this.roomId).then(res => {
            this.room = res;

            //Add 4 nonAvailableBookingPeriod

            //#1 booked periods
            if (this.room.bookedPeriods !== undefined) {
                this.room.bookedPeriods.forEach(bookedPeriod => {

                    let event: CalendarEvent = {
                        start: new Date(bookedPeriod.startDateTime),
                        end: new Date(bookedPeriod.endDateTime),
                        title: '已有預約: ' + this.getTimeString(new Date(bookedPeriod.startDateTime)) + ' - ' + this.getTimeString(new Date(bookedPeriod.endDateTime)),
                        color: colors.red
                    }

                    this.events.push(event);
                })
            }

            //#2 room non-avalidable booking day
            if (this.room.roomNonAvailablePeriod !== undefined) {
                this.room.roomNonAvailablePeriod.forEach(nonAvailableBookingPeriod => {

                    let startDate = new Date(nonAvailableBookingPeriod.startDate);
                    startDate.setHours(0, 0, 0, 0);
                    let endDate = new Date(nonAvailableBookingPeriod.endDate);
                    endDate.setHours(24, 0, 0, 0);

                    let event: CalendarEvent = {
                        start: startDate,
                        end: endDate,
                        title: '房間暫停預約: 全日',
                        color: colors.yellow
                    }

                    this.events.push(event);
                })
            }

            //#3 center non-avalidable booking day

            if (this.room.center.nonAvailablePeriod !== undefined) {
                this.room.center.nonAvailablePeriod.forEach(nonAvailableBookingPeriod => {
                    let startDate = new Date(nonAvailableBookingPeriod.startDate);
                    startDate.setHours(0, 0, 0, 0);
                    let endDate = new Date(nonAvailableBookingPeriod.endDate);
                    endDate.setHours(24, 0, 0, 0);

                    let event: CalendarEvent = {
                        start: startDate,
                        end: endDate,
                        title: '中心暫停營業: 全日',
                        color: colors.yellow
                    }

                    this.events.push(event);
                })
            }

            //#4 center non-avalidable booking day
            for (var i = 0; i < 15; i++) {
                //14 days information will be provided, so we loop 14 times to check the business day
                // if any periods are not the business hours, we will create an event to simulate a non avalidable booking period

                let currentDateStarTime = addDays(new Date(), i);
                currentDateStarTime.setHours(0, 0, 0, 0);

                let currentDateEndTime = addDays(new Date(), i);
                currentDateEndTime.setHours(24, 0, 0, 0);

                let weekDayBusinessHour;

                switch (currentDateStarTime.getDay()) {
                    case 1:
                        weekDayBusinessHour = this.room.center.businessHours[0].monday;
                        break;
                    case 2:
                        weekDayBusinessHour = this.room.center.businessHours[0].tuesday;
                        break;
                    case 3:
                        weekDayBusinessHour = this.room.center.businessHours[0].wednesday;
                        break;
                    case 4:
                        weekDayBusinessHour = this.room.center.businessHours[0].thursday;
                        break;
                    case 5:
                        weekDayBusinessHour = this.room.center.businessHours[0].friday;
                        break;
                    case 6:
                        weekDayBusinessHour = this.room.center.businessHours[0].saturday;
                        break;
                    case 0:
                        weekDayBusinessHour = this.room.center.businessHours[0].sunday;
                        break;
                }

                if (weekDayBusinessHour.isOpen) {
                    // add two events, one is before businessHour, another is after  businessHour
                    let businessHourStart = weekDayBusinessHour.startTime;
                    let businessHourEnd = weekDayBusinessHour.endTime;

                    let businessStartHour = parseInt(businessHourStart.split(':')[0]);
                    let businessStartMin = parseInt(businessHourStart.split(':')[1]);

                    let businessEndHour = parseInt(businessHourEnd.split(':')[0]);
                    let businessEndtMin = parseInt(businessHourEnd.split(':')[1]);

                    let businessHourStartDateTime = addDays(new Date(), i);
                    businessHourStartDateTime.setHours(businessStartHour, businessStartMin, 0, 0);

                    let businessHourEndDateTime = addDays(new Date(), i);
                    businessHourEndDateTime.setHours(businessEndHour, businessEndtMin, 0, 0);

                    let beforeBusinessHourEvent = {
                        start: currentDateStarTime,
                        end: businessHourStartDateTime,
                        title: '非營業時間: ' + this.getTimeString(currentDateStarTime) + ' - ' + this.getTimeString(businessHourStartDateTime),
                        color: colors.yellow
                    }

                    this.events.push(beforeBusinessHourEvent);

                    if (businessEndHour != 0) {
                        // not closed on or after 00:00 am
                        let afterBusinessHourEvent = {
                            start: businessHourEndDateTime,
                            end: currentDateEndTime,
                            title: '非營業時間: ' + this.getTimeString(businessHourEndDateTime) + ' - ' + this.getTimeString(currentDateEndTime),
                            color: colors.yellow
                        }

                        this.events.push(afterBusinessHourEvent);
                    }


                } else {
                    // add a all day event
                    let businessHourEvent = {
                        start: currentDateStarTime,
                        end: currentDateEndTime,
                        title: '非營業時間: 全日',
                        color: colors.yellow
                    }

                    this.events.push(businessHourEvent);
                }
            }

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
        this.navCtrl.push(BookformPage, { 'room': this.room, 'bookingEvents': this.events });
    }
    showCalendar() {
        this.isShowCalendar = !this.isShowCalendar;
    }
    showGears() {
        this.isShowGears = !this.isShowGears;
    }

    getTimeString(dateTime) {
        return dateTime.toLocaleTimeString().split(':')[0] + ':' + dateTime.toLocaleTimeString().split(':')[1]
    }
}
