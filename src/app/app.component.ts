import { Component, HostListener, OnInit, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageNotificationService } from './shared/services/message-toast.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MainComponent } from './shared/pages/main/main.component';
import { AuthComponent } from './core/auth/auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    NgxSpinnerModule,
    ToastModule,
    SidebarComponent,
    MainComponent,
    AuthComponent,
  ],
  providers: [MessageNotificationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // Propiedad para determinar si la ruta actual es la de login
  isLoginPage: boolean = false;
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(0);
  constructor(private primengConfig: PrimeNGConfig, private router: Router) {
    // Escucha los cambios de ruta
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login'; // Ajusta la ruta de login según tu aplicación
    });

    if (typeof window !== 'undefined') {
      this.screenWidth.set(window.innerWidth);
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.screenWidth.set(window.innerWidth);
      if (this.screenWidth() < 768) {
        this.isLeftSidebarCollapsed.set(true);
      }
    }
  }
  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
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
