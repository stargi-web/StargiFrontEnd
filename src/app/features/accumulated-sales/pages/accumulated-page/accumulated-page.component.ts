import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccumulatedAnimationDialogComponent } from '../../components/accumulated-animation-dialog/accumulated-animation-dialog.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { AccumulatedService } from '../../services/accumulated.service';
import { Accumulated } from '../../models/accumulated.interface';
@Component({
  selector: 'app-accumulated-page',
  standalone: true,
  imports: [ButtonModule, InputNumberModule, FormsModule],
  providers: [DialogService],
  templateUrl: './accumulated-page.component.html',
  styleUrl: './accumulated-page.component.css',
})
export class AccumulatedPageComponent {
  previousAccumulated: number = 0;
  currentAccumulated: number = 0;
  goal: number = 0;
  ref: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private accumulatedService: AccumulatedService
  ) {}

  ngOnInit() {
    //  this.showDialog();
    this.accumulatedService.getLastAccumulated().subscribe((accumulated) => {
      this.previousAccumulated = accumulated.currentAccumulated;
      this.currentAccumulated = accumulated.currentAccumulated;
      this.goal = accumulated.goal;
    });
  }

  showDialog() {
    this.ref = this.dialogService.open(AccumulatedAnimationDialogComponent, {
      header: '',
      width: '50%',
      height: '70%',
    });
  }

  saveForm() {
    // Crear el objeto accumulated con los datos del formulario
    const accumulated: Accumulated = {
      previousAccumulated: this.previousAccumulated,
      currentAccumulated: this.currentAccumulated,
      goal: this.goal,
    };
    //service api
    this.accumulatedService.updateAccumulated(accumulated).subscribe();
  }
}
