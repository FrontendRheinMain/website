import {Component} from '@angular/core';
import {ExampleService} from "../../services/example.service";

@Component({
    selector: 'ferm-root',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    title = 'ferm';

    constructor(private exampleService:ExampleService){
    }
}
