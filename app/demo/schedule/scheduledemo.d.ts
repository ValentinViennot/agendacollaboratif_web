import { OnInit, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../service/eventservice';
export declare class ScheduleDemo implements OnInit {
    private eventService;
    private cd;
    events: any[];
    header: any;
    event: MyEvent;
    dialogVisible: boolean;
    idGen: number;
    constructor(eventService: EventService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    handleDayClick(event: any): void;
    handleEventClick(e: any): void;
    saveEvent(): void;
    deleteEvent(): void;
    findEventIndexById(id: number): number;
}
export declare class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
}
