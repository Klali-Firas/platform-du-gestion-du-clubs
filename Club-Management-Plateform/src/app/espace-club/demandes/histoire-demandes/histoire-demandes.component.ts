import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDemande } from 'src/app/interfaces/idemande';

import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-histoire-demandes',
  templateUrl: './histoire-demandes.component.html',
  styleUrls: ['./histoire-demandes.component.css']
})
export class HistoireDemandesComponent implements OnInit {
  demandes: IDemande[] = []
  clubData = JSON.parse(localStorage.getItem("clubData")!!);
  constructor(private api: APIService) {

  }
  ngOnInit(): void {
    this.api.getDemandesByClubID(this.clubData.id).subscribe({
      next: (rep) => {
        this.demandes = rep.reverse();
      }
    })
  }
  formatDemandeDate(dateString: string): string {
    // Assuming the server provides date in UTC, you can specify the timezone as 'UTC'
    const formattedDate = formatDate(dateString, 'HH:mm dd/MM/yyyy', 'en-US', 'UTC');
    return formattedDate;
  }
}
