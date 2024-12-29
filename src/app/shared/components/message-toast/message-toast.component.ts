import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-message-toast',
  template: `<p-toast></p-toast>`,
})
export class ToastComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}
}
