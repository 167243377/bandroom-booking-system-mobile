import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild
} from '@angular/core';
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
    selector: 'full-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'full-calendar.html'
})
export class FullCalendarComponent {
    @Input() events: CalendarEvent[];
    @Input() viewDate: Date;

    private isShowCalendar = false;
    private view: string = 'day';

    constructor(el: ElementRef) {
    }

    ngOnInit() {
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate());
    }
    
    showCalendar(){
        this.isShowCalendar = !this.isShowCalendar;
    }
}

