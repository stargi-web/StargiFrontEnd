import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-card',
  standalone: true,
  imports: [],
  templateUrl: './base-card.component.html',
  styleUrl: './base-card.component.css'
})
export class BaseCardComponent {
  @Input() collectionName!: string;
  @Input() clientCount!: number;
}
