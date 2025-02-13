import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ButtonModule,
    RippleModule,
    StyleClassModule,
    SidebarItemComponent,
    TooltipModule,
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css',
})
export class SidebarItemComponent {
  @Input() isLeftSidebarCollapsed: boolean = false;
  @Input() item: MenuItem = {
    label: '', // Valor por defecto para label
    icon: '', // Valor por defecto para icon
    items: [], // Valor por defecto para items
  };
}
