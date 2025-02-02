import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
@Component({
  selector: 'app-unauthorized-page',
  standalone: true,
  imports: [ButtonModule, CommonModule, RouterModule],
  templateUrl: './unauthorized-page.component.html',
  styleUrl: './unauthorized-page.component.css',
})
export class UnauthorizedPageComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
