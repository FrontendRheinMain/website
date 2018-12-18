import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {ContentService} from "../../services/content.service";
import {DirectoriesService} from "../../services/directories.service";

@Component({
    selector: 'ferm-root',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    title = 'ferm';

    public directories$: Observable<any[]>;
    public nextEvent$: Observable<any[]>;
    public previousEvents$: Observable<any[]>;

    constructor(private directoryService: DirectoriesService, private contentService: ContentService) {
        this.directories$ = this.directoryService.fetchRootTree();
        this.nextEvent$ = this.contentService.fetchNextEvent();
        this.previousEvents$ = this.contentService.fetchPreviousEvents();

    }
}
