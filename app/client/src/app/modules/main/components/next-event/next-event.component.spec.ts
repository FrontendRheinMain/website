import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextEventComponent } from './next-event.component';

describe('NextEventComponent', () => {
  let component: NextEventComponent;
  let fixture: ComponentFixture<NextEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
