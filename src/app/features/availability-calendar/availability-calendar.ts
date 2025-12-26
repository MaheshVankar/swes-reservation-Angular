import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

interface CalendarDay {
  day: number;
  available: boolean;
}

interface EquipmentHistory {
  date: string;
  returnDate?: string | null;
  status: string;
}

@Component({
  standalone: true,
  selector: 'app-availability-calendar',
  imports: [CommonModule],
  templateUrl: './availability-calendar.html',
  styleUrls: ['./availability-calendar.scss']
})
export class AvailabilityCalendarView implements OnInit {

  year!: number;
  month!: number;
  monthLabel = '';
  history: EquipmentHistory[] = [];


  days: CalendarDay[] = [];
  blockedDates = new Set<string>();

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

ngOnInit(): void {
  const today = new Date();

  this.year = today.getFullYear();
  this.month = today.getMonth(); // 0-based

  // 🔥 MUST BUILD FIRST
  this.buildCalendar();

  // 🔥 THEN load availability
  this.loadData();
}
loadData(): void {
  this.api.getEquipmentHistory().subscribe({
    next: (history) => {
      this.history = history;
      this.buildBlockedDates(history);
      this.buildCalendar(); // re-evaluate availability
    },
    error: () => {
      // DO NOTHING — calendar already rendered
    }
  });
}



buildCalendar(): void {
  const totalDays = new Date(this.year, this.month + 1, 0).getDate();

  this.monthLabel = new Date(this.year, this.month)
    .toLocaleString('default', { month: 'long', year: 'numeric' });

  this.days = [];

  for (let day = 1; day <= totalDays; day++) {
    const key = `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isPast = new Date(key) < new Date(new Date().toDateString());

    this.days.push({
      day,
      available: !isPast && !this.blockedDates.has(key)
    });
  }
}


  buildBlockedDates(history: EquipmentHistory[]): void {
    this.blockedDates.clear();

    history.forEach(h => {
      if (h.status === 'Returned' && h.returnDate) return;

      const start = new Date(h.date);
      const end = h.returnDate
        ? new Date(h.returnDate)
        : new Date(this.year, this.month + 1, 0);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        this.blockedDates.add(key);
      }
    });
  }

  selectDay(d: CalendarDay): void {
    if (!d.available) return;

    const date = `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
    this.router.navigate(['/reserve'], { queryParams: { date } });
  }

  prevMonth(): void {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    this.buildCalendar();
  }

  nextMonth(): void {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.buildCalendar();
  }
}
