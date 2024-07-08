import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllappointmentComponent } from './view-allappointment.component';

describe('ViewAllappointmentComponent', () => {
  let component: ViewAllappointmentComponent;
  let fixture: ComponentFixture<ViewAllappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllappointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
