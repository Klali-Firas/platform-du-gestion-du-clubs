import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IDemande } from 'src/app/interfaces/idemande';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-repondre-demande',
  templateUrl: './repondre-demande.component.html',
  styleUrls: ['./repondre-demande.component.css']
})
export class RepondreDemandeComponent {
  demande!: IDemande;
  clubData = JSON.parse(localStorage.getItem("clubData")!!);
  reponseInput = ""
  idParam = "";
  constructor(private api: APIService, private aRoute: ActivatedRoute) { }
  clubName = ""

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: ParamMap) => {
      this.idParam = params.get('idDem')!;
      if (this.idParam) {
        this.api.getDemandeById(this.idParam).subscribe({
          next: (res) => {
            this.demande = res;
            this.getClubName()

          }
        });
      }
    });
  }

  formatDemandeDate(dateString: string): string {
    // Assuming the server provides the date in UTC, you can specify the timezone as 'UTC'
    const formattedDate = formatDate(dateString, 'dd/MM/yyyy, HH:mm', 'en-US', 'UTC');
    return formattedDate;
  }

  addReponse(updatedData: { reponse: string, etat: string }) {
    if (this.reponseInput !== "") {
      this.api.updateDemande(this.idParam, updatedData).subscribe({
        next: (res) => {
          this.api.getDemandeById(this.idParam).subscribe({
            next: (res) => {
              this.demande = res;
            }
          });
        }
      })
    }
  }
  getClubName() {
    this.api.getClubById(this.demande.clubID).subscribe({
      next: (res) => {
        this.clubName = res.clubName;
      }
    })
  }


}
