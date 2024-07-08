import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllvisitorsComponent } from './view-allvisitors.component';

describe('ViewAllvisitorsComponent', () => {
  let component: ViewAllvisitorsComponent;
  let fixture: ComponentFixture<ViewAllvisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllvisitorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllvisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
