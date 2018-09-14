import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
    selector: 'ferm-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    @Input('categories') categories$: Observable<any>;

    constructor() {
    }

    ngOnInit() {
    }

}
