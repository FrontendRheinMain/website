import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './components/main/main.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MainRoutingModule
    ],
    providers: [],
    bootstrap: [MainComponent]
})
export class MainModule {
    constructor(){
        console.log('started');
    }
}
