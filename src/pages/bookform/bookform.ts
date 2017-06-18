import { ReceiptPage } from '../receipt/receipt';
import { Room } from '../../model/room';
import { Component } from '@angular/core';
import { DateTime, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { PhoneNoValidator } from '../../pages/bookform/validators/phoneNo';

import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';

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

@Component({
    selector: 'page-bookform',
    templateUrl: 'bookform.html'
})
export class BookformPage {
    private minDate;
    private maxDate;
    room: Room;
    private bookingForm: FormGroup;
    private isFormTriedSubmit: boolean = false;

    private events: CalendarEvent[] = [];
    private isShowCalendar = false;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private formBuilder: FormBuilder,
        private alertCtrl: AlertController) {
        //form builder is a handy library that can easily create validations / is dirty for attributes

        //get selected room from the room page
        this.room = navParams.get('room');

        //initialize the form group object, what attributes should it has
        this.initializeForm();
        // other ready-to-use validations
        // Validators.minLength(4),
        // Validators.maxLength(24),
        // Validators.pattern('Regular Expression here')

        //get non-availdable booking events from room detail page
        this.events = navParams.get('bookingEvents');
    }

    form_submit_BookRoom() {

        this.isFormTriedSubmit = true;

        if (this.bookingForm.invalid) {
            return;
        }

        if (this.canBook()) {
            this.navCtrl.push(ReceiptPage, {
                selectedRoom: this.room,
                bookingData: this.bookingForm.value,
                isViewMode: false
            })
        }
    }

    initializeForm() {
        this.bookingForm = this.formBuilder.group({
            bookDate: ['', Validators.required],
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

    showCalendar() {
        if (this.isShowCalendar) {
            this.isShowCalendar = false;
        } else {
            this.isShowCalendar = true;
        }
    }

    canBook(): boolean {

        var bookStartDate = new Date(this.bookingForm.get('bookDate').value);
        bookStartDate.setHours(
            this.bookingForm.get('startDateTime').value.split(':')[0],
            this.bookingForm.get('startDateTime').value.split(':')[1],
            0,
            0
        )
        var bookEndDate = new Date(this.bookingForm.get('bookDate').value);
        bookEndDate.setHours(
            this.bookingForm.get('endDateTime').value.split(':')[0],
            this.bookingForm.get('endDateTime').value.split(':')[1],
            0,
            0
        )

        if (this.bookingForm.get('endDateTime').value.split(':')[0] == "00") {
            bookEndDate = addDays(bookEndDate, 1);
        }

        console.log(bookStartDate);
        console.log(bookEndDate);

        if (new Date() > bookStartDate) {
            // cannot book past date or time
            //E.g Now = 10:00 am, but user inputs 09:00 am
            let alert = this.alertCtrl.create({
                message: "開始時間為已過去時間，請選擇其他可預約時間",
                buttons: [{
                    text: '知道了'
                }]
            })

            alert.present();
            return false;
        }

        if (bookEndDate <= bookStartDate) {
            let alert = this.alertCtrl.create({
                message: "完結時間不能早於或等於開始時間，請選擇其他可預約時間",
                buttons: [{
                    text: '知道了'
                }]
            })

            alert.present();
            return false;
        }


        var diffMs = Math.abs(+bookEndDate - +bookStartDate);
        var diffMins = Math.floor((diffMs / 1000) / 60);

        console.log(diffMins);

        if (diffMins < 30) {
            let alert = this.alertCtrl.create({
                message: "預約時間至少為30分鐘",
                buttons: [{
                    text: '知道了'
                }]
            })

            alert.present();
            return false;
        }

        //check whether selected date and timeslot can be booked, all events are a not availdable timeslot for booking.
        this.events.map(event => {
            let eventStartDate = new Date(event.start);
            let eventEndDate = new Date(event.end);

            if (eventStartDate.toDateString() == bookStartDate.toDateString()) {
                //we will only compare the same day event

                if (bookStartDate < eventEndDate && bookEndDate > eventStartDate) {
                    let alert = this.alertCtrl.create({
                        message: event.title + "，請選擇其他可預約時間",
                        buttons: [{
                            text: '知道了'
                        }]
                    })

                    alert.present();

                    return false;
                }
            }
        });

        return true;
    }

}
