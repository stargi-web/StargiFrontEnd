import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  busyResquestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  busy() {
    this.busyResquestCount++;
    this.spinnerService;
    this.spinnerService.show();
  }
  idle() {
    this.busyResquestCount--;
    if (this.busyResquestCount <= 0) {
      this.busyResquestCount = 0;
      this.spinnerService.hide();
    }
  }
}
