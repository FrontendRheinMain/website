import {Component} from '@angular/core';
import {ExampleService} from "../../services/example.service";
import {Observable} from "rxjs";
import {ContentService} from "../../services/content.service";

@Component({
    selector: 'ferm-root',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    title = 'ferm';

    public categories$: Observable<any[]>;
    public nextEvent$: Observable<any[]>;
    public previousEvents$: Observable<any[]>;

    constructor(private contentService: ContentService) {
        this.categories$ = this.contentService.fetchCategories();
        this.nextEvent$ = this.contentService.fetchNextEvent();
        this.previousEvents$ = this.contentService.fetchPreviousEvents();

    }
}
