import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmmentComponent } from './view-appointmment.component';

describe('ViewAppointmmentComponent', () => {
  let component: ViewAppointmmentComponent;
  let fixture: ComponentFixture<ViewAppointmmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAppointmmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppointmmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
