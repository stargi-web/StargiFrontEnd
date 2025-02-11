import { Component, NgZone, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css',
})
export class ClockComponent implements OnInit {
  currentTime: Date = new Date();
  days: string[] = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
  private intervalId: any;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          this.currentTime = new Date();
        });
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  constructor(private ngZone: NgZone) {}

  to2Digit(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  getHours(): string {
    const hours = this.currentTime.getHours();
    return this.to2Digit(hours > 12 ? hours - 12 : hours);
  }

  getMinutes(): string {
    return this.to2Digit(this.currentTime.getMinutes());
  }

  getSeconds(): string {
    return this.to2Digit(this.currentTime.getSeconds());
  }

  getAmPm(): string {
    return this.currentTime.getHours() >= 12 ? 'PM' : 'AM';
  }

  getDay(): string {
    return this.days[this.currentTime.getDay()];
  }

  getFormattedDate(): string {
    return this.currentTime.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
