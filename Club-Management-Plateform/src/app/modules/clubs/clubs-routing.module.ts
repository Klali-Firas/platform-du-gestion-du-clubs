import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubsComponent } from 'src/app/espace-club/clubs/clubs.component';
import { DemandeFormateurComponent } from 'src/app/espace-club/demandes/demande-formateur/demande-formateur.component';
import { GestionDeMembersComponent } from 'src/app/espace-club/gestion-de-members/gestion-de-members.component';
import { HistoireDemandesComponent } from 'src/app/espace-club/demandes/histoire-demandes/histoire-demandes.component';
import { ReservationMaterialComponent } from 'src/app/espace-club/reservations/reservation-material/reservation-material.component';
import { ReservationSalleComponent } from 'src/app/espace-club/reservations/reservation-salles/reservation-salles.component';
import { ReservationStandComponent } from 'src/app/espace-club/reservations/reservation-stand/reservation-stand.component';
import { HistoireReservationsComponent } from 'src/app/espace-club/reservations/histoire-reservations/histoire-reservations.component';
import { ContactAdminComponent } from 'src/app/espace-club/contact-admin/contact-admin.component';

const routes: Routes = [
  { path: "gestion-de-members", component: GestionDeMembersComponent, },
  { path: "demande-formateur", component: DemandeFormateurComponent, },
  { path: "histoire-demandes", component: HistoireDemandesComponent },
  { path: "reservation-salle", component: ReservationSalleComponent },
  { path: "reservation-stand", component: ReservationStandComponent },
  { path: "reservation-material", component: ReservationMaterialComponent },
  { path: "histoire-reservations", component: HistoireReservationsComponent },
  { path: "contact-administrateur", component: ContactAdminComponent },
  { path: "", component: ClubsComponent, },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  // canActivate: [AuthGuardService]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubsRoutingModule { }
