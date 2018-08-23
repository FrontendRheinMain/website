import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExampleService {

    private endpoint: string = environment.applicationServer + 'example/';

    constructor(private http: HttpClient) {
        console.log('Production environment:', environment.production);

        this.http.get(this.endpoint).subscribe((data) => {
            console.log(data);
        });
    }
}
