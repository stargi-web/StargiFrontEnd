import { Component } from '@angular/core';
import { Annex } from '../../models/annex.interface';
import { AnnexService } from '../../services/annex.service';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-annexes-list-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    PaginatorModule,
    ConfirmDialogModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './annexes-list-page.component.html',
  styleUrl: './annexes-list-page.component.css',
})
export class AnnexesListPageComponent {
  userRole: string = '';
  annexes: Annex[] = [];
  paginatedAnnexes: Annex[] = [];
  first: number = 0;

  visible: boolean = false;

  annex = {
    title: '',
    description: '',
    url: '',
  };

  constructor(
    private annexService: AnnexService,
    private sessionStorageService: SessionStorageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userRole =
      this.sessionStorageService.getItem(SESSION_ITEMS.ROLE) || '';
    this.getAnnexes();
  }
  hasAdminPermission(): boolean {
    return this.userRole === 'admin' || this.userRole === 'HHRR';
  }

  updatePage() {
    this.paginatedAnnexes = this.annexes.slice(this.first, this.first + 6);
  }
  // Manejar el cambio de página
  onPageChange(event: any) {
    this.first = event.first; // Actualiza el índice del primer elemento
    this.updatePage(); // Actualiza las encuestas visibles
  }

  confirmDelete(event: Event, annex: Annex) {
    if (annex.id !== undefined) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Seguro que quiere eliminar esta anexo?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          if (annex.id !== undefined) {
            // console.log(annex.id);
            this.deleteAnnex(annex.id);
          }
        },
        reject: () => {},
      });
    }
  }

  showDialog() {
    this.visible = true;
  }

  resetForm() {
    this.annex = { title: '', description: '', url: '' };
  }

  getAnnexes(): void {
    this.annexService.getAllAnnexes().subscribe((annexes) => {
      this.annexes = annexes;
      this.updatePage();
      console.log(this.annexes);
    });
  }

  deleteAnnex(annexId: number) {
    this.annexService.deleteAnnex(annexId).subscribe({
      next: () => {
        this.annexes = this.annexes.filter((annex) => annex.id !== annexId);
        this.updatePage();
      },
    });
  }

  createAnnex() {
    if (!this.annex.title || !this.annex.url) {
      alert('Titulo y URL son requeridos');
      return;
    }

    this.annexService.createAnnex(this.annex).subscribe({
      next: (newAnnex) => {
        console.log(newAnnex);
        this.annexes.push(newAnnex);
        this.updatePage();
        this.visible = false; // Cerrar el modal
        this.resetForm(); // Limpiar formulario
      },
    });
  }
}
