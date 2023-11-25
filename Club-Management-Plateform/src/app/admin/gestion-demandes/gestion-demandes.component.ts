import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IDemande } from 'src/app/interfaces/idemande';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gestion-demandes',
  templateUrl: './gestion-demandes.component.html',
  styleUrls: ['./gestion-demandes.component.css']
})
export class GestionDemandesComponent {
  demandes: IDemande[] = []
  clubData = JSON.parse(localStorage.getItem("clubData")!!);
  constructor(private api: APIService, private router: Router) {

  }
  ngOnInit(): void {
    this.getDemandes();
  }

  getDemandes() {
    this.api.getAllDemandes().subscribe({
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
  navigateToDemande(id: string) {
    this.router.navigate([`admin/${this.clubData.id}/gestion-demandes`, id]);
  }
}
