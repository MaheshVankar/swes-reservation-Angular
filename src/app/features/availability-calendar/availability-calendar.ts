import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-availability-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './availability-calendar.html',
  styleUrls: ['./availability-calendar.scss']
})
export class AvailabilityCalendar implements OnInit {

  @Input() year!: number;
  @Input() month!: number;

  @Output() dateSelected = new EventEmitter<string>();

  days: {
    day: number;
    date: string;
    available: boolean;
  }[] = [];

  ngOnInit(): void {
    this.buildCalendar();
  }

  private buildCalendar(): void {
    this.days = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(this.year, this.month, d);
      dateObj.setHours(0, 0, 0, 0);

      const isPast = dateObj < today;

      // ✅ LOCAL DATE STRING (NO UTC CONVERSION)
      const date =
        this.year +
        '-' +
        String(this.month + 1).padStart(2, '0') +
        '-' +
        String(d).padStart(2, '0');

      this.days.push({
        day: d,
        date,
        available: !isPast
      });
    }
  }

  onDateClick(date: string, available: boolean): void {
    if (!available) return;
    this.dateSelected.emit(date);
  }
}
