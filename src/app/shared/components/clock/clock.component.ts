import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit {
  ngOnInit(): void {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    const now = new Date();
    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');

    if (secondHand && minuteHand && hourHand) {
      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      secondHand.setAttribute('style', `transform: rotate(${secondsDegrees}deg)`);

      const minutes = now.getMinutes();
      const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
      minuteHand.setAttribute('style', `transform: rotate(${minutesDegrees}deg)`);

      const hours = now.getHours();
      const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
      hourHand.setAttribute('style', `transform: rotate(${hoursDegrees}deg)`);
    }
  }
}
