import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OpportunityModel } from '../../../core/models/opportunityModel';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-executive-dashboard',
  standalone: true,
  imports: [TableModule,DropdownModule,FormsModule,CommonModule ],
  templateUrl: './executive-dashboard.component.html',
  styleUrl: './executive-dashboard.component.css'
})
export class ExecutiveDashboardComponent implements OnInit {
  opportunities!:OpportunityModel[];
 
  loading: unknown;
  ngOnInit(): void {
    this.opportunities =  [
      {
          id: 1,
          ruc: 12345678901,
          businessName: 'Empresa ABC',
          sfaOpportunityNumber: 1001,
          creationDateSfaOpp: new Date('2023-01-01'),
          opportunityType: 'Básico',
          product: 'DBI-Fibra Óptica',
          otherDetails: 'Instalación en sede principal',
          createdAt: new Date('2023-01-15'),
          status: 'Potenciales',
          estimatedClosingDate: new Date('2023-02-28'),
          commentary: 'Cliente potencial interesado en mejorar la conectividad'
      },
      {
          id: 2,
          ruc: 98765432109,
          businessName: 'Corporación XYZ',
          sfaOpportunityNumber: 1002,
          creationDateSfaOpp: new Date('2023-01-20'),
          opportunityType: 'Estándar',
          product: 'DBI-Radio Enlace',
          otherDetails: 'Necesita cobertura en zonas rurales',
          createdAt: new Date('2023-02-10'),
          status: 'Prospecto',
          estimatedClosingDate: new Date('2023-03-20'),
          commentary: 'Reunión programada para presentación de propuesta'
      },
      {
          id: 3,
          ruc: 11223344556,
          businessName: 'Tecnología Innovadora',
          sfaOpportunityNumber: 1003,
          creationDateSfaOpp: new Date('2023-02-05'),
          opportunityType: 'No estandar',
          product: 'Nube Pública',
          otherDetails: 'Migración de datos y aplicaciones',
          createdAt: new Date('2023-03-05'),
          status: 'Prospecto Calificado',
          estimatedClosingDate: new Date('2023-04-15'),
          commentary: 'Negociación en etapa avanzada, expectativa de cierre próximo'
      },
      {
          id: 4,
          ruc: 99887766554,
          businessName: 'Seguridad Digital',
          sfaOpportunityNumber: 1004,
          creationDateSfaOpp: new Date('2023-03-20'),
          opportunityType: 'Básico',
          product: 'Antivirus',
          otherDetails: 'Licencias para 100 equipos',
          createdAt: new Date('2023-04-20'),
          status: 'Prospecto Desarrollo',
          estimatedClosingDate: new Date('2023-05-30'),
          commentary: 'Demostración técnica programada para la próxima semana'
      },
      {
          id: 5,
          ruc: 66778899001,
          businessName: 'Almacenamiento Seguro',
          sfaOpportunityNumber: 1005,
          creationDateSfaOpp: new Date('2023-04-12'),
          opportunityType: 'Estandar',
          product: 'Cloud Backup',
          otherDetails: 'Backup automatizado de servidores',
          createdAt: new Date('2023-05-12'),
          status: 'Cierre',
          estimatedClosingDate: new Date('2023-06-25'),
          commentary: 'Contrato en revisión legal antes de la firma'
      },
      {
          id: 6,
          ruc: 12345098765,
          businessName: 'Comunicaciones Integradas',
          sfaOpportunityNumber: 1006,
          creationDateSfaOpp: new Date('2023-05-08'),
          opportunityType: 'No estandar',
          product: 'Central telefónica',
          otherDetails: 'Implementación en oficinas principales y sucursales',
          createdAt: new Date('2023-06-08'),
          status: 'No Cierre',
          estimatedClosingDate: new Date('2023-07-10'),
          commentary: 'Cliente decidió postergar la decisión de compra'
      },
      {
          ruc: 98765432109,
          businessName: 'Universidad Nacional',
          sfaOpportunityNumber: 1007,
          creationDateSfaOpp: new Date('2023-06-15'),
          opportunityType: 'Básico',
          product: 'DBI-Fibra Óptica',
          otherDetails: 'Ampliación de red en campus universitario',
          createdAt: new Date('2023-07-15'),
          status: 'No Contactado',
          estimatedClosingDate: new Date('2023-08-30'),
          commentary: 'Intentos de contacto sin respuesta del cliente'
      },
      {
          id: 8,
          ruc: 11223344556,
          businessName: 'Eventos y Conexiones',
          sfaOpportunityNumber: 1008,
          creationDateSfaOpp: new Date('2023-07-05'),
          opportunityType: 'Estándar',
          product: 'DBI-Radio Enlace',
          otherDetails: 'Conectividad para evento al aire libre',
          createdAt: new Date('2023-08-05'),
          status: 'Potenciales',
          estimatedClosingDate: new Date('2023-09-15'),
          commentary: 'Solicitud de información inicial recibida'
      },
      {
          id: 9,
          ruc: 99887766554,
          businessName: 'Soluciones Cloud',
          sfaOpportunityNumber: 1009,
          creationDateSfaOpp: new Date('2023-08-20'),
          opportunityType: 'No estandar',
          product: 'Nube Pública',
          otherDetails: 'Implementación de solución multi-nube',
          createdAt: new Date('2023-09-20'),
          status: 'Prospecto',
          estimatedClosingDate: new Date('2023-10-30'),
          commentary: 'Propuesta técnica enviada para revisión del cliente'
      },
      {
          id: 10,
          ruc: 66778899001,
          businessName: 'Protección Total',
          sfaOpportunityNumber: 1010,
          creationDateSfaOpp: new Date('2023-09-10'),
          opportunityType: 'Básico',
          product: 'Antivirus',
          otherDetails: 'Actualización de licencias y configuraciones',
          createdAt: new Date('2023-10-10'),
          status: 'Prospecto Calificado',
          estimatedClosingDate: new Date('2023-11-20'),
          commentary: 'Negociaciones avanzadas con el departamento de TI'
      },
      {
          id: 11,
          ruc: 12345098765,
          businessName: 'Almacenamiento Seguro',
          sfaOpportunityNumber: 1011,
          creationDateSfaOpp: new Date('2023-10-15'),
          opportunityType: 'Estandar',
          product: 'Cloud Backup',
          otherDetails: 'Respaldos diarios de datos críticos',
          createdAt: new Date('2023-11-15'),
          status: 'Prospecto Desarrollo',
          estimatedClosingDate: new Date('2023-12-25'),
          commentary: 'Reunión de seguimiento programada con el cliente'
      },
      {
          id: 12,
          ruc: 98765432109,
          businessName: 'Comunicaciones Avanzadas',
          sfaOpportunityNumber: 1012,
          creationDateSfaOpp: new Date('2023-11-05'),
          opportunityType: 'No estandar',
          product: 'Central telefónica',
          otherDetails: 'Sistema de telefonía IP para nueva oficina',
          createdAt: new Date('2024-01-05'),
          status: 'Cierre',
          estimatedClosingDate: new Date('2024-02-15'),
          commentary: 'Propuesta comercial aceptada, proceso de implementación en curso'
      },
      {
          id: 13,
          ruc: 11223344556,
          businessName: 'Comercializadora ABC',
          sfaOpportunityNumber: 1013,
          creationDateSfaOpp: new Date('2023-12-10'),
          opportunityType: 'Básico',
          product: 'DBI-Fibra Óptica',
          otherDetails: 'Instalación en local comercial',
          createdAt: new Date('2024-02-10'),
          status: 'No Cierre',
          estimatedClosingDate: new Date('2024-03-20'),
          commentary: 'Cliente decidió posponer la decisión de compra'
      },
      {
          id: 14,
          ruc: 99887766554,
          businessName: 'Industrias XYZ',
          sfaOpportunityNumber: 1014,
          creationDateSfaOpp: new Date('2024-01-15'),
          opportunityType: 'Estándar',
          product: 'DBI-Radio Enlace',
          otherDetails: 'Conectividad para planta industrial',
          createdAt: new Date('2024-03-15'),
          status: 'No Contactado',
          estimatedClosingDate: new Date('2024-04-30'),
          commentary: 'Intentos de contacto sin éxito, continuar seguimiento'
      },
      {
          id: 15,
          ruc: 66778899001,
          sfaOpportunityNumber: 1015,
          creationDateSfaOpp: new Date('2024-01-15'),
          opportunityType: 'No estandar',
          product: 'Nube Pública',
          otherDetails: 'Implementación de solución híbrida',
          createdAt: new Date('2024-04-20'),
          status: 'Potenciales',
          estimatedClosingDate: new Date('2024-05-30'),
          commentary: 'Primer contacto establecido, explorando necesidades del cliente',
          businessName: 'Soluciones Empresariales'
      }
  ];
  

  }

}
