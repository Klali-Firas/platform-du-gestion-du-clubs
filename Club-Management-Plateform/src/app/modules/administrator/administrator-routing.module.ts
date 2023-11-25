import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionClubsComponent } from 'src/app/admin/gestion-clubs/gestion-clubs.component';
import { GestionDemandesComponent } from 'src/app/admin/gestion-demandes/gestion-demandes.component';
import { GestionMaterialStandSalleComponent } from 'src/app/admin/gestion-material-stand-salle/gestion-material-stand-salle.component';
import { GestionReservarionComponent } from 'src/app/admin/gestion-reservarion/gestion-reservarion.component';
import { HomeComponent } from 'src/app/admin/home/home.component';
import { MessagerieComponent } from 'src/app/admin/messagerie/messagerie.component';
import { RepondreDemandeComponent } from 'src/app/admin/repondre-demande/repondre-demande.component';
import { RepondreReservationComponent } from 'src/app/admin/repondre-reservation/repondre-reservation.component';

const routes: Routes = [
  { path: "gestion-material-stand-salle", component: GestionMaterialStandSalleComponent },
  { path: "gestion-reservations", component: GestionReservarionComponent },
  { path: "gestion-demandes", component: GestionDemandesComponent },
  { path: "gestion-reservations/:idRes", component: RepondreReservationComponent },
  { path: "gestion-demandes/:idDem", component: RepondreDemandeComponent },
  { path: "gestion-clubs", component: GestionClubsComponent },
  { path: "messagerie", component: MessagerieComponent },
  { path: "", component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
