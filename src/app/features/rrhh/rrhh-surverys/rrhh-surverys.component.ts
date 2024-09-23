import { Component, OnInit } from '@angular/core';
import { EnabledEvaluationService } from '../../../services/enabledEvaluationService';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MONTHS } from '../../../shared/const/months';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-rrhh-surverys',
  standalone: true,
  imports: [DropdownModule,InputNumberModule,FormsModule,ButtonModule],
  templateUrl: './rrhh-surverys.component.html',
  styleUrl: './rrhh-surverys.component.css'
})
export class RrhhSurverysComponent implements OnInit {
  enabledEvaluations: any[] = [];
  month?:any;
  year?:number;
  months=MONTHS;
  constructor(private enabledEvaluationService: EnabledEvaluationService) {}

  ngOnInit() {
    this.enabledEvaluationService.getAll().subscribe({
      next:response=>{
        this.enabledEvaluations=response;
      },
      error:error=>console.error(error)
    })
  }

  createEnabledEvaluation(){
    if(this.month&&this.year){
      this.enabledEvaluationService.createEnableEvaluation({month:this.month.value,year:this.year}).subscribe(
        {
          next:response=>{
            alert("Creación exitosa");
          },
          error:error=>{console.error(error); alert("Error al crear evaluación (Probablemente ya existe una evaluación con las fechas dadas)")}
        }
      )
    } 
  }
}
