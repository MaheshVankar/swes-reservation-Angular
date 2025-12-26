import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  standalone: true,
  selector: 'app-reservation-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation-create.html'
})
export class ReservationCreate {

  form: FormGroup;

  loading = false;
  success = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) {
this.form = this.fb.group({
  employeeId: ['', Validators.required],
  item: ['', Validators.required],
  startDate: ['', Validators.required]
});

  }

onSubmit(): void {
  // Reset UI state on every submit
  this.error = null;
  this.success = false;

  // 🔴 THIS IS THE KEY FIX
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;

  this.api.createReservation(this.form.value).subscribe({
    next: () => {
      this.loading = false;
      this.success = true;
      this.form.reset();
    },
    error: () => {
      this.loading = false;
      this.error = 'Failed to create reservation.';
    }
  });
}

}
