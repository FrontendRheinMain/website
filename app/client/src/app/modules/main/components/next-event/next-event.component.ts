import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
    selector: 'ferm-next-event',
    templateUrl: './next-event.component.html',
    styleUrls: ['./next-event.component.scss']
})
export class NextEventComponent implements OnInit {
    @Input('event') nextEvent$: Observable<any>;

    constructor() {
    }

    ngOnInit() {
    }

}
