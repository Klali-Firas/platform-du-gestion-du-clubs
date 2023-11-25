import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStateService } from 'src/app/services/login-state.service';

@Component({
  selector: 'app-navbar-du-club',
  templateUrl: './navbar-du-club.component.html',
  styleUrls: ['./navbar-du-club.component.css']
})
export class NavbarDuClubComponent {
  constructor(private router: Router, private loginState: LoginStateService,) { }
  logout() {
    // Remove the token from local storage
    this.loginState.remove();
    localStorage.removeItem('clubData');
    localStorage.removeItem('clubID');
    this.router.navigate(['']);
  }
  clubID = localStorage.getItem('clubID');
  clubData = JSON.parse(localStorage.getItem('clubData')!)

  navigateToDemandeFormateur() {
    this.router.navigate([`/clubs/${this.clubID}/demande-formateur`]);
  }
  navigateToGestionDeMembers() {
    this.router.navigate([`/clubs/${this.clubID}/gestion-de-members`]);
  }
  navigateToReservationMaterial() {
    this.router.navigate([`/clubs/${this.clubID}/reservation-material`]);
  }
  navigateToHistoireDemandes() {
    this.router.navigate([`/clubs/${this.clubID}/histoire-demandes`]);
  }
  navigateToReservationSalle() {
    this.router.navigate([`/clubs/${this.clubID}/reservation-salle`]);
  }
  navigateToReservationStand() {
    this.router.navigate([`/clubs/${this.clubID}/reservation-stand`]);
  }
  navigateToHistireReservation() {
    this.router.navigate([`/clubs/${this.clubID}/histoire-reservations`]);
  }
  navigateToContactAdministrateur() {
    this.router.navigate([`/clubs/${this.clubID}/contact-administrateur`]);
  }
  navigateToHome() {
    this.router.navigate([`/clubs/${this.clubID}`]);
  }





}
