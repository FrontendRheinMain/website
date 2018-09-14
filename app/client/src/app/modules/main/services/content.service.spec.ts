import {TestBed, inject} from '@angular/core/testing';

import {ContentService} from './content.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ContentService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, HttpTestingController],
            providers: [ContentService]
        });
    });

    it('should be created', inject([ContentService], (service: ContentService) => {
        expect(service).toBeTruthy();
    }));
});
