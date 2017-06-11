import { AppSettings } from '../../appSettings';
import { RoomService } from '../../services/roomService';
import { ModalController } from 'ionic-angular';
import { Toast } from 'ionic-native/dist/esm';

import { animate, Component, ElementRef, state, style, transition, trigger, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Room } from '../../model/room';
import { BookformPage } from '../bookform/bookform';

@Component({
    selector: 'page-room',
    templateUrl: 'room.html',
    styles: [
    `
    .item-block{
        min-height: 0;
        transition: 0.09s all linear;
    }
    `
    ],
    animations: [
        trigger('expand', [
            state('true', style({ height: '25px' })),
            state('false', style({ height: '0' })),
            transition('void => *', animate('0s')),
            transition('* <=> *', animate('250ms ease-in-out'))
        ])
    ]
})
export class RoomPage {
    private host = AppSettings.apiHost;
    private roomId;
    private room;

    private eventSource;
    private viewTitle;
    private calendar = {
        // default view = week
        mode: 'week',
        currentDate: new Date()
    };
    private isShowCalendar = false;

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
        private roomService: RoomService) {

        this.roomId = navParams.get('roomId');
        // this.loadEvents();

        this.room = {
            _id: '2kogvg6dE8zwTqNv4E',
            center: {
                name: 'SAW MUSIC',
                address: '新界元朗良業街8-12A號嘉華工業大廈506',
                contactNumber: '2345 6789',
                district: {
                    code: 'YL',
                    description: '元朗'
                },
                lat: 22.449454,
                lngi: 114.028447
            },
            description: "Bandroom",
            price: "100",
            images: ["CybqjGNnhm5stokoT", "S9JqC5wRRTsPWKnuf"],
            roomType: {
                code: 'drum',
                description: '鼓房'
            },
            canTeach: true,
            hasKeyboard: false
        }
    }

    ngOnInit() {
        // this.roomService.


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
        if (this.isShowCalendar) {
            this.isShowCalendar = false;
        } else {
            this.isShowCalendar = true;
        }
    }
}
