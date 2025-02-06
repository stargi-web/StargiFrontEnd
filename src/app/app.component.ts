import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageNotificationService } from './shared/services/message-toast.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    NgxSpinnerModule,
    ToastModule,
    NavbarComponent,
  ],
  providers: [MessageNotificationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // Propiedad para determinar si la ruta actual es la de login
  isLoginPage: boolean = false;
  constructor(private primengConfig: PrimeNGConfig, private router: Router) {
    // Escucha los cambios de ruta
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login'; // Ajusta la ruta de login según tu aplicación
    });
  }
  ngOnInit(): void {
    this.primengConfig.setTranslation({
      startsWith: 'Empieza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Termina con',
      equals: 'Igual a',
      notEquals: 'No igual a',
      noFilter: 'Sin filtro',
      lt: 'Menor que',
      lte: 'Menor o igual que',
      gt: 'Mayor que',
      gte: 'Mayor o igual que',
      is: 'Es',
      isNot: 'No es',
      before: 'Antes',
      after: 'Después',
      clear: 'Limpiar',
      apply: 'Aplicar',
      matchAll: 'Coincidir con todos',
      matchAny: 'Coincidir con cualquiera',
      addRule: 'Agregar regla',
      removeRule: 'Eliminar regla',
      accept: 'Aceptar',
      reject: 'Rechazar',
      choose: 'Elegir',
      upload: 'Subir',
      cancel: 'Cancelar',
    });
  }
  title = 'StargiFrontend';
}
