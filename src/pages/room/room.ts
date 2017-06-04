import { ModalController } from 'ionic-angular';
import { Toast } from 'ionic-native/dist/esm';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Room } from '../../model/room';
import { BookformPage } from '../bookform/bookform';

@Component({
    selector: 'page-room',
    templateUrl: 'room.html'
})
export class RoomPage {
    private room: Room;

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
        public modalCtrl: ModalController) {

        this.room = <Room>navParams.data;
        this.loadEvents();
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
}
