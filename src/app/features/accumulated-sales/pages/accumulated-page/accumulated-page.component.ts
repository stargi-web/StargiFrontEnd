import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccumulatedAnimationDialogComponent } from '../../components/accumulated-animation-dialog/accumulated-animation-dialog.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-accumulated-page',
  standalone: true,
  imports: [ButtonModule, InputNumberModule, FormsModule],
  providers: [DialogService],
  templateUrl: './accumulated-page.component.html',
  styleUrl: './accumulated-page.component.css',
})
export class AccumulatedPageComponent {
  montoActual: number = 0;
  meta: number = 0;
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    //  this.showDialog();
  }

  showDialog() {
    this.ref = this.dialogService.open(AccumulatedAnimationDialogComponent, {
      header: '',
      width: '50%',
      height: '70%',
    });
  }
}
