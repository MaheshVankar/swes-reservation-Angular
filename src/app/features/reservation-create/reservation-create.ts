import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AvailabilityCalendar } from '../availability-calendar/availability-calendar';

@Component({
  selector: 'app-reservation-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AvailabilityCalendar
  ],
  templateUrl: './reservation-create.html',
  styleUrls: ['./reservation-create.scss']
})
export class ReservationCreate {

  @ViewChild('calendarModalContent') calendarModalContent!: TemplateRef<any>;

  form: FormGroup;

  calendarYear = new Date().getFullYear();
  calendarMonth = new Date().getMonth();

  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      item: ['', Validators.required],
      reservationDate: ['', Validators.required]
    });
  }

  openCalendarModal(): void {
    this.modalService.open(this.calendarModalContent, {
      size: 'lg',
      centered: true
    });
  }

  onReservationDateSelected(date: string): void {
    this.form.patchValue({ reservationDate: date });
    this.form.get('reservationDate')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // 🔴 THIS IS ESSENTIAL
      return;
    }
  this.loading = true;
  this.success = false;

  setTimeout(() => {
    this.loading = false;
    this.success = true;

    // ✅ RESET WITH DEFAULTS
    this.form.reset({
      employeeId: '',
      item: '',
      reservationDate: ''
    });
  }, 800);
  }
}
