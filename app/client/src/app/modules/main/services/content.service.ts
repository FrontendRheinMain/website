import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../../../environments/environment';
import {promise} from "selenium-webdriver";
import map = promise.map;
import {filter, mergeMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ContentService {
    private endpoint: string = environment.applicationServer + 'content/json/';
    private directoryEndpoint: string = environment.applicationServer + 'directory';


    constructor(private http: HttpClient) {

    }

    public fetchDirectory(): Observable<any> {
        return this.http.get(this.directoryEndpoint);
    }

    public fetchNextEvent(): Observable<any> {
        return this.http
            .get(this.endpoint + 'events')
            .pipe(mergeMap((events:any[]):any => {
                if (events.length === 1) {
                    return this.http.get(events[0].path);
                }
            }));
    }

    public fetchPreviousEvents(): Observable<any> {
        return this.http
            .get(this.endpoint + 'archive')
            .pipe(mergeMap((events:any[]):any => {
                if (events.length === 1) {
                    return this.http.get(events[0].path);
                }
            }));
    }
}
