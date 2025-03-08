import { DecimalPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgZone } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-accumulated-animation-dialog',
  standalone: true,
  imports: [DecimalPipe, ProgressBarModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './accumulated-animation-dialog.component.html',
  styleUrl: './accumulated-animation-dialog.component.css',
})
export class AccumulatedAnimationDialogComponent {
  currentAmount: number = 0;
  updatedAmount: number = 6000;
  goal: number = 14000;
  fillPercentage: number = 0;

  interval: any;
  value: number = 0;
  percentage: number = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.animateAmount(this.currentAmount, this.updatedAmount, 2000);

    this.ngZone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        this.ngZone.run(() => {
          this.percentage = Math.round((this.updatedAmount / this.goal) * 100);
        });
      }, 100);
    });
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  /**
   * Función que anima el valor numérico desde start hasta end en el tiempo indicado.
   * @param start - Valor inicial
   * @param end - Valor final
   * @param duration - Duración de la animación en milisegundos
   */
  animateAmount(start: number, end: number, duration: number) {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      // Calcular el progreso (entre 0 y 1)
      const progress = Math.min(elapsedTime / duration, 1);
      // Actualizar el monto actual según la interpolación lineal
      this.currentAmount = Math.floor(start + (end - start) * progress);
      // Calcular el porcentaje de llenado basado en la meta
      this.fillPercentage = (this.currentAmount / this.goal) * 100;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // La animación terminó, puedes agregar lógica adicional si lo requieres
      }
    };

    requestAnimationFrame(animate);
  }
}
