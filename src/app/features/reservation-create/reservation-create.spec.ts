import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { ReservationCreate, pastDateValidator } from './reservation-create';
import { AvailabilityCalendar } from '../availability-calendar/availability-calendar';

describe('ReservationCreate', () => {
  let component: ReservationCreate;
  let fixture: ComponentFixture<ReservationCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        AvailabilityCalendar,
        ReservationCreate
      ],
      providers: [NgbModal]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the form when employeeId is empty', () => {
    component.form.controls['employeeId'].setValue('');
    expect(component.form.controls['employeeId'].valid).toBeFalsy();
  });

  it('should invalidate the form when employeeId is less than 5 characters', () => {
    component.form.controls['employeeId'].setValue('1234');
    expect(component.form.controls['employeeId'].valid).toBeFalsy();
  });

  it('should validate the form when employeeId is 5 or more characters', () => {
    component.form.controls['employeeId'].setValue('12345');
    expect(component.form.controls['employeeId'].valid).toBeTruthy();
  });

  it('should invalidate the form when reservationDate is in the past', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    component.form.controls['reservationDate'].setValue(pastDate.toISOString().split('T')[0]);
    expect(component.form.controls['reservationDate'].valid).toBeFalsy();
  });

  it('should validate the form when reservationDate is today or in the future', () => {
    const today = new Date();
    component.form.controls['reservationDate'].setValue(today.toISOString().split('T')[0]);
    expect(component.form.controls['reservationDate'].valid).toBeTruthy();

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    component.form.controls['reservationDate'].setValue(futureDate.toISOString().split('T')[0]);
    expect(component.form.controls['reservationDate'].valid).toBeTruthy();
  });

  it('should have a default value of "Boots" for the item control', () => {
    expect(component.form.controls['item'].value).toBe('Boots');
  });
});
