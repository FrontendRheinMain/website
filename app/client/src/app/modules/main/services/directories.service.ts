import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {mergeMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class DirectoriesService {

    constructor(private http: HttpClient) {

    }

    private endpoint: string = environment.applicationServer + 'directory/';


    public fetchRootTree(depth: number = 0): Observable<any> {
        return this.http.get(this.endpoint);
    }
}
