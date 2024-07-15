import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../../services/teamService';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-admin-create-team-dialog',
  standalone: true,
  imports: [InputTextModule,FormsModule,ButtonModule],
  templateUrl: './admin-create-team-dialog.component.html',
  styleUrl: './admin-create-team-dialog.component.css'
})
export class AdminCreateTeamDialogComponent {
  name?:string;
  constructor(private ref:DynamicDialogRef,private teamService:TeamService){}
  save(){
    if(this.name){
      this.teamService.createTeam({name:this.name}).subscribe(
        {
          next:response=>{
            this.ref.close();
          },
          error:error=>{
            console.error(error)
          }
        }
      )
    }
    
  }
}
