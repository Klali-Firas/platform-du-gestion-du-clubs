import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/interfaces/ireservation';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-histoire-reservations',
  templateUrl: './histoire-reservations.component.html',
  styleUrls: ['./histoire-reservations.component.css']
})
export class HistoireReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  clubData = JSON.parse(localStorage.getItem("clubData")!!);
  constructor(private api: APIService) {

  }
  ngOnInit(): void {
    this.api.getReservationsByClubId(this.clubData.id).subscribe({
      next: (res) => {
        this.reservations = res.reverse();
      }
    })
  }
  formatDemandeDate(dateString: string): string {
    // Assuming the server provides date in UTC, you can specify the timezone as 'UTC'
    const formattedDate = formatDate(dateString, 'dd/MM/yyyy, HH:mm', 'en-US', 'UTC');
    return formattedDate;
  }
}
