import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ExampleService {

    private endpoint: string = environment.applicationServer + 'content/';

    constructor(private http: HttpClient) {

    }

    public fetchAll(): Observable<any[]> {
        return this.http.get<any[]>(this.endpoint);
    }
}
