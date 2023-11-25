import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarDuClubComponent } from './espace-club/navbar-du-club/navbar-du-club.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './acceuil/login/login.component';
import { RegistrationComponent } from './acceuil/registration/registration.component';
import { NavBarComponent } from './acceuil/nav-bar/nav-bar.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DemandeFormateurComponent } from './espace-club/demandes/demande-formateur/demande-formateur.component';
import { ClubsComponent } from './espace-club/clubs/clubs.component';
import { LoginStateService } from './services/login-state.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt-interceptor';
import { GestionDeMembersComponent } from './espace-club/gestion-de-members/gestion-de-members.component';
import { ReservationMaterialComponent } from './espace-club/reservations/reservation-material/reservation-material.component';
import { MaterielCardComponent } from './espace-club/components/materiel-card/materiel-card.component';
import { HistoireDemandesComponent } from './espace-club/demandes/histoire-demandes/histoire-demandes.component';
import { ReservationSalleComponent } from './espace-club/reservations/reservation-salles/reservation-salles.component';
import { ReservationStandComponent } from './espace-club/reservations/reservation-stand/reservation-stand.component';
import { HistoireReservationsComponent } from './espace-club/reservations/histoire-reservations/histoire-reservations.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { GestionMaterialStandSalleComponent } from './admin/gestion-material-stand-salle/gestion-material-stand-salle.component';
import { GestionReservarionComponent } from './admin/gestion-reservarion/gestion-reservarion.component';
import { RepondreReservationComponent } from './admin/repondre-reservation/repondre-reservation.component';
import { GestionDemandesComponent } from './admin/gestion-demandes/gestion-demandes.component';
import { RepondreDemandeComponent } from './admin/repondre-demande/repondre-demande.component';
import { GestionClubsComponent } from './admin/gestion-clubs/gestion-clubs.component';
import { ContactAdminComponent } from './espace-club/contact-admin/contact-admin.component';
import { DatePipe } from '@angular/common';
import { MessagerieComponent } from './admin/messagerie/messagerie.component';


@NgModule({
  declarations: [
    NavbarDuClubComponent,
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavBarComponent,

    AcceuilComponent,
    DemandeFormateurComponent,
    ClubsComponent,
    GestionDeMembersComponent,
    ReservationMaterialComponent,
    MaterielCardComponent,
    HistoireDemandesComponent,
    ReservationSalleComponent,
    ReservationStandComponent,
    HistoireReservationsComponent,
    NavbarAdminComponent,
    GestionMaterialStandSalleComponent,
    GestionReservarionComponent,
    RepondreReservationComponent,
    GestionDemandesComponent,
    RepondreDemandeComponent,
    GestionClubsComponent,
    ContactAdminComponent,
    MessagerieComponent



  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,


  ],
  providers: [LoginStateService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
