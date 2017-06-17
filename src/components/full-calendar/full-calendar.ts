import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';

@Component({
    selector: 'full-calendar',
    templateUrl: 'full-calendar.html'
})
export class FullCalendarComponent {
    @Input() events: CalendarEvent[];

    private view: string = 'day';
    private viewDate: Date = new Date();

    // events: CalendarEvent[] = [{
    //     start: subDays(startOfDay(new Date()), 1),
    //     end: addDays(new Date(), 1),
    //     title: 'A 3 day event',
    //     color: colors.red,
    //     actions: this.actions
    // }, {
    //     start: startOfDay(new Date()),
    //     title: 'An event with no end date',
    //     color: colors.yellow,
    //     actions: this.actions
    // }, {
    //     start: subDays(endOfMonth(new Date()), 3),
    //     end: addDays(endOfMonth(new Date()), 3),
    //     title: 'A long event that spans 2 months',
    //     color: colors.blue
    // }, {
    //     start: addHours(startOfDay(new Date()), 2),
    //     end: new Date(),
    //     title: 'A draggable and resizable event',
    //     color: colors.yellow,
    //     actions: this.actions,
    //     resizable: {
    //         beforeStart: true,
    //         afterEnd: true
    //     },
    //     draggable: true
    // }];

    constructor() {

    }

    ngOnInit() {

    }

}