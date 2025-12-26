import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-availability-calendar',
  imports: [CommonModule],
  templateUrl: './availability-calendar.html'
})
export class AvailabilityCalendar implements OnInit {

  year = new Date().getFullYear();
  month = new Date().getMonth();
  days: ({ date: Date; available: boolean } | null)[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.generate();
  }

  generate() {
    this.days = [];

    const first = new Date(this.year, this.month, 1);
    const last = new Date(this.year, this.month + 1, 0);

    // leading empty cells
    for (let i = 0; i < first.getDay(); i++) {
      this.days.push(null);
    }

    for (let d = 1; d <= last.getDate(); d++) {
      const date = new Date(this.year, this.month, d);
      this.days.push({
        date,
        available: date.getDay() !== 0 && date.getDay() !== 6
      });
    }
  }

  select(day: { date: Date; available: boolean } | null) {
    if (!day || !day.available) return;

    // IMPORTANT: YYYY-MM-DD only
    const formatted = day.date.toISOString().split('T')[0];

    this.router.navigate(['/reserve'], {
      queryParams: { date: formatted }
    });
  }
}
