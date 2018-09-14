import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './components/main/main.component';
import {HttpClientModule} from "@angular/common/http";
import {NavigationComponent} from './components/navigation/navigation.component';
import {ContentService} from "./services/content.service";
import { NextEventComponent } from './components/next-event/next-event.component';
import { PreviousEventsComponent } from './components/previous-events/previous-events.component';

@NgModule({
    declarations: [
        MainComponent,
        NavigationComponent,
        NextEventComponent,
        PreviousEventsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MainRoutingModule
    ],
    providers: [ContentService],
    bootstrap: [MainComponent]
})
export class MainModule {
    constructor() {
        console.log('started');
    }
}
