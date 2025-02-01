import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-calendar.component.html',
  styleUrl: './custom-calendar.component.css',
})
export class CustomCalendarComponent {
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() attendances: Date[] = [];

  currentMonthDays: (Date | null)[] = [];
  weekdays: string[] = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  ngOnInit() {
    this.generateCalendarDays();
  }

  generateCalendarDays() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);

    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDayOfMonth.getDay();

    this.currentMonthDays = [];

    const blanks = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    for (let i = 0; i < blanks; i++) {
      this.currentMonthDays.push(null);
    }

    for (
      let day = firstDayOfMonth.getDate();
      day <= lastDayOfMonth.getDate();
      day++
    ) {
      this.currentMonthDays.push(new Date(year, month, day));
    }
  }

  isWithinRange(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }

  isWeekday(date: Date): boolean {
    const day = date.getDay();
    return day >= 1 && day <= 5;
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  isAttendanceDay(date: Date): boolean {
    return this.attendances.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );
  }
  getDayClass(date: Date): string {
    if (!this.isWithinRange(date)) {
      return 'outside-range';
    }
    if (this.isWeekend(date)) {
      return 'weekend';
    }
    if (this.isWeekday(date)) {
      if (this.isAttendanceDay(date)) {
        return 'attendance-day';
      } else {
        return 'no-attendance-day';
      }
    }
    return '';
  }
}
