import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmp } from './manage-emp';

describe('ManageEmp', () => {
  let component: ManageEmp;
  let fixture: ComponentFixture<ManageEmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
