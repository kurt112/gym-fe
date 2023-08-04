import { Component, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfMonth, addHours, isSameMonth, isSameDay, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { EventColor } from 'calendar-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GymClass } from 'src/app/gym-classes/GymClass';
import { Schedule } from 'global/utils/schedule';
import { formatDate } from '@angular/common';
import { formatTimeToAmToPm, formatTimeToShortTime, formatToDateWord } from 'global/date';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'store-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ScheduleComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined = undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [

  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private http: HttpClient) {
    this.http.get<any>(`${environment.apiUrl}gym/classes/schedules`).subscribe(data => {
      console.log(data);
      
      data.forEach((e: GymClass) => {
        console.log(e);
        

        e.schedules?.forEach((schedule:Schedule) => {
          const dateStart = e.dateStart !== null ? new Date(schedule.startTime) : new Date();
          const dateEnd =  e.dateEnd !== null ? new Date(schedule.endTime) : new Date();

          const calendarEvent: CalendarEvent = {
            start:startOfDay(dateStart),
            end: endOfDay(dateEnd),
            title: `${e.name} - ${e.type} (${formatTimeToAmToPm(dateStart)} - ${formatTimeToAmToPm(dateEnd)})`,
            color: { ...colors['blue'] },
            actions: this.actions,
          }

          this.events.push(calendarEvent);
        })
      });
      // console.log(calendarEvents);
    })

    this.modalData = {
      event: this.events[0],
      action: 'click'
    }
    this.modalContent = undefined;


  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
