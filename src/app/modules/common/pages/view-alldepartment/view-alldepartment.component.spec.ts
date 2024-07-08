import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAlldepartmentComponent } from './view-alldepartment.component';

describe('ViewAlldepartmentComponent', () => {
  let component: ViewAlldepartmentComponent;
  let fixture: ComponentFixture<ViewAlldepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAlldepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAlldepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
