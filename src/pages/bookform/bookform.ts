import { ReceiptPage } from '../receipt/receipt';
import { Room } from '../../model/room';
import { Component } from '@angular/core';
import { DateTime, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { PhoneNoValidator } from '../../pages/bookform/validators/phoneNo';

@Component({
    selector: 'page-bookform',
    templateUrl: 'bookform.html'
})
export class BookformPage {
    private minDate;
    private maxDate;
    room: Room;
    private bookingForm: FormGroup;
    private eventSource;
    private viewTitle;
    private calendar = {
        // default view = week
        mode: 'week',
        currentDate: new Date()
    };
    private isShowCalendar = false;
    private statusTitle = "顯示";

    private markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0, 0);
        return date < current;
    };

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private formBuilder: FormBuilder) {
        //form builder is a handy library that can easily create validations / is dirty for attributes

        //get selected room from the room page
        this.room = navParams.get('room');

        //initialize the form group object, what attributes should it has
        this.initializeForm();
        // other ready-to-use validations
        // Validators.minLength(4),
        // Validators.maxLength(24),
        // Validators.pattern('Regular Expression here')

        this.loadEvents();

        //a library for hiding information in a Collapsed area (bottom of the page)
    }

    form_submit_BookRoom() {

        this.navCtrl.push(ReceiptPage, {
            selectedRoom: this.room,
            bookingData: this.bookingForm.value,
            isViewMode: false
        })
    }

    initializeForm() {
        this.bookingForm = this.formBuilder.group({
            bookDate: [new Date().toDateString(), Validators.required],
            startDateTime: ['', Validators.required],
            endDateTime: ['', Validators.required],
            phoneNo: ['', Validators.compose([Validators.required, PhoneNoValidator.isValid])], // custom validation
            contactName: ['', Validators.maxLength(30)],
            people: ['', Validators.maxLength(1)]
        })

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

    showCalendar() {
        if (this.isShowCalendar) {
            this.isShowCalendar = false;
            this.statusTitle = "顯示";
        } else {
            this.isShowCalendar = true;
            this.statusTitle = "隱藏";
        }
    }

}
