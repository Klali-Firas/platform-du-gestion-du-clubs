import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/interfaces/ireservation';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gestion-reservarion',
  templateUrl: './gestion-reservarion.component.html',
  styleUrls: ['./gestion-reservarion.component.css']
})
export class GestionReservarionComponent implements OnInit {

  reservations: Reservation[] = [];
  clubData = JSON.parse(localStorage.getItem("clubData")!!);
  constructor(private api: APIService, private router: Router) {

  }
  ngOnInit(): void {
    this.api.getAllReservations().subscribe({
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

  navigateToReservation(id: string) {
    this.router.navigate([`admin/${this.clubData.id}/gestion-reservations`, id]);
  }
}


