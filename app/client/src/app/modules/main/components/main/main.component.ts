import {Component} from '@angular/core';
import {ExampleService} from "../../services/example.service";
import {Observable} from "rxjs";

@Component({
    selector: 'ferm-root',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    title = 'ferm';

    public contents$: Observable<any[]>;

    constructor(private exampleService: ExampleService) {
        this.contents$ = this.exampleService.fetchAll();
    }
}
