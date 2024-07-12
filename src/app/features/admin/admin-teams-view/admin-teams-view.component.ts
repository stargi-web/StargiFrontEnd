import { Component, OnInit } from '@angular/core';
import { TeamCardModel } from '../../../core/models/teamCardModel';
import { TeamService } from '../../../services/teamService';
import {CardModule} from 'primeng/card';
@Component({
  selector: 'app-admin-teams-view',
  standalone: true,
  imports: [CardModule],
  templateUrl: './admin-teams-view.component.html',
  styleUrl: './admin-teams-view.component.css'
})
export class AdminTeamsViewComponent implements OnInit {
  teams!:TeamCardModel[];
  constructor(private teamService:TeamService){}
  ngOnInit(): void {
    this.loadTeams();
  }
  loadTeams(){
    this.teamService.getTeams().subscribe({
      next:response=>{
        this.teams=response;
      },
      error:error=>console.error(error)
    })
  }
}
