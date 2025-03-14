import { DecimalPipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  NgZone,
  Output,
} from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccumulatedService } from '../../services/accumulated.service';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-accumulated-animation-dialog',
  standalone: true,
  imports: [DecimalPipe, ProgressBarModule, TagModule, ButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './accumulated-animation-dialog.component.html',
  styleUrl: './accumulated-animation-dialog.component.css',
})
export class AccumulatedAnimationDialogComponent {
  previousAccumulated: number = 0;
  currentAccumulated: number = 0;
  currentAmount: number = 0;
  goal: number = 14000;
  fillPercentage: number = 0;

  interval: any;
  value: number = 0;
  percentage: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    private ngZone: NgZone,
    private accumulatedService: AccumulatedService
  ) {}

  ngOnInit() {
    this.accumulatedService.getLastAccumulated().subscribe((accumulated) => {
      this.previousAccumulated = accumulated.previousAccumulated;
      this.currentAccumulated = accumulated.currentAccumulated;
      this.currentAmount = accumulated.previousAccumulated;
      this.goal = accumulated.goal;

      this.animateAmount(0, this.currentAccumulated, 2000);

      this.ngZone.runOutsideAngular(() => {
        this.interval = setInterval(() => {
          this.ngZone.run(() => {
            this.percentage = Math.round(
              (this.currentAccumulated / this.goal) * 100
            );
          });
        }, 100);
      });
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
        const lottiePlayer = document.querySelector('lottie-player') as any;
        if (lottiePlayer) {
          //lottiePlayer.stop(); // Detener la animación del lottie-player
        }
      }
    };

    requestAnimationFrame(animate);
  }
}
