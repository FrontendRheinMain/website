import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
    selector: 'ferm-previous-events',
    templateUrl: './previous-events.component.html',
    styleUrls: ['./previous-events.component.scss']
})
export class PreviousEventsComponent implements OnInit {

    @Input('events') previousEvents$: Observable<any>;

    constructor() {
    }

    ngOnInit() {
    }

}
