import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStateService } from 'src/app/services/login-state.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {
  constructor(private router: Router, private loginState: LoginStateService,) { }
  logout() {
    // Remove the token from local storage
    this.loginState.remove();
    localStorage.removeItem('clubData');
    localStorage.removeItem('clubID');
    this.router.navigate(['']);
  }
  clubID = localStorage.getItem('clubID');

  navigateToGestionMaterialStandSalle() {
    this.router.navigate([`/admin/${this.clubID}/gestion-material-stand-salle`]);
  }
  navigateToGestionReservations() {
    this.router.navigate([`/admin/${this.clubID}/gestion-reservations`]);
  }
  navigateToGestionDemandes() {
    this.router.navigate([`/admin/${this.clubID}/gestion-demandes`]);
  }
  navigateToGestionClubs() {
    this.router.navigate([`/admin/${this.clubID}/gestion-clubs`]);
  }
  navigateToMessagerie() {
    this.router.navigate([`/admin/${this.clubID}/messagerie`]);
  }


}
