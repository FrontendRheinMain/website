import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './components/main/main.component';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        BrowserModule,
        MainRoutingModule
    ],
    providers: [],
    bootstrap: [MainComponent]
})
export class MainModule {
}
