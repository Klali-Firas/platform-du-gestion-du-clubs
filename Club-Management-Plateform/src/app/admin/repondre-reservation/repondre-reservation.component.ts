import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Reservation } from 'src/app/interfaces/ireservation';
import { APIService } from 'src/app/services/api.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-repondre-reservation',
  templateUrl: './repondre-reservation.component.html',
  styleUrls: ['./repondre-reservation.component.css']
})
export class RepondreReservationComponent implements OnInit {
  reservation!: Reservation;
  clubData = JSON.parse(localStorage.getItem("clubData")!!);
  reponseInput = ""
  idParam = "";
  constructor(private api: APIService, private aRoute: ActivatedRoute) { }
  clubName = ""

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: ParamMap) => {
      this.idParam = params.get('idRes')!;
      if (this.idParam) {
        this.api.getReservationById(this.idParam).subscribe({
          next: (res) => {
            this.reservation = res;
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
      this.api.updateReservation(this.idParam, updatedData).subscribe({
        next: (res) => {
          this.api.getReservationById(this.idParam).subscribe({
            next: (res) => {
              this.reservation = res;
            }
          });
        }
      })
    }
  }
  getClubName() {
    this.api.getClubById(this.reservation.clubID).subscribe({
      next: (res) => {
        this.clubName = res.clubName;
      }
    })
  }



}
