import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  standalone: true,
  selector: 'app-email-notification',
  imports: [CommonModule],
  templateUrl: './email-notification.html'
})
export class EmailNotification {

  success = false;
  //error = false;
  loading = false;
error: string | null = null;

  constructor(private api: ApiService) {}

send() {
  this.loading = true;
  this.error = null;
  this.success = false;

  this.api.sendNotification().subscribe({
    next: () => {
      this.loading = false;
      this.success = true;
    },
    error: () => {
      this.loading = false;
      this.error = 'Failed to send email notification.';
    }
  });
}
}
