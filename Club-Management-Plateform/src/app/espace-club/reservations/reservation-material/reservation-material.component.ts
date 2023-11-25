
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Material } from 'src/app/interfaces/imaterial';
import { Reservation } from 'src/app/interfaces/ireservation';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reservation-material',
  templateUrl: './reservation-material.component.html',
  styleUrls: ['./reservation-material.component.css']
})
export class ReservationMaterialComponent implements OnInit {
  reservations: Reservation[] = [];
  materials: Material[] = [];
  selectedMaterialId: string | null = null;
  clubData = JSON.parse(localStorage.getItem('clubData')!!);
  reservationForm!: FormGroup;
  today = new Date();

  ISOToday = this.today.toISOString();


  constructor(
    private reservationService: APIService,
    private materialService: APIService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.today.setDate(this.today.getDate() + 1);
    this.ISOToday = this.today.toISOString();
    this.getReservations();
    this.loadMaterials();
    this.initForm();

  }

  initForm(): void {

    this.reservationForm = this.formBuilder.group({
      objet: ['', Validators.required],
      description: ['', Validators.required],
      dateDeb: [{ value: '', disabled: true }, Validators.required, this.isDateAvailable.bind(this)],
      dateFin: [{ value: '', disabled: true }, Validators.required, this.isDateFinAvailable.bind(this)],
      selectedMaterialId: ['', Validators.required],
    });

  }
  isAfterToday(date: Date): boolean {
    let today = new Date();
    today.setHours(0, 0, 0, 0); // if you want to ignore time

    return new Date(date) >= today;
  }
  enableDateDeb() {
    this.reservationForm.get('dateDeb')?.setValue('')
    this.reservationForm.get('dateFin')?.setValue('')
    this.reservationForm.get('dateDeb')?.enable();
    this.reservationForm.get('dateFin')?.disable();
  }

  isDateAvailable(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      const selectedDateDeb = control.value;

      for (let i = 0; i < this.reservations.length; i++) {
        const reservation = this.reservations[i];

        if (
          reservation.etat === 'accepter' &&
          selectedDateDeb >= reservation.dateDeb &&
          selectedDateDeb <= reservation.dateFin &&
          reservation.reference === this.reservationForm.get('selectedMaterialId')!.value
        ) {
          resolve({ dateUnavailable: true });
          return;
        }
      }

      resolve(null); // Resolve with null if the date is available
    });
  }

  isDateFinAvailable(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      const selectedDateFin = control.value;

      for (let i = 0; i < this.reservations.length; i++) {
        const reservation = this.reservations[i];

        if (
          reservation.etat === 'accepter' &&
          (reservation.dateDeb >= this.reservationForm.get('dateDeb')?.value && reservation.dateDeb <= selectedDateFin) &&
          reservation.reference === this.reservationForm.get('selectedMaterialId')!.value
        ) {
          resolve({ dateUnavailable: true });
          return;
        }
      }

      resolve(null); // Resolve with null if the date is available
    });
  }

  enableDateFin() {
    if (this.reservationForm.controls['dateDeb'].valid) { this.reservationForm.get('dateFin')?.enable(); }
    else {
      this.reservationForm.get('dateFin')?.disable();

    }
    if (this.reservationForm.get('dateFin')?.value <= this.reservationForm.get('dateDeb')?.value)
      this.reservationForm.get('dateFin')?.setValue('');
  }





  loadMaterials(): void {
    this.materialService.getAllMaterials().subscribe({
      next: (materials) => {
        this.materials = materials;
      },
      error: (error) => {
        console.error('Error loading materials:', error);
      },
    });
  }

  getReservations() {
    this.reservationService.getAllReservations().subscribe({
      next: (res) => {
        this.reservations = res;
        this.reservations.sort((a, b) => {
          const dateA = new Date(a.dateDeb).getTime();
          const dateB = new Date(b.dateDeb).getTime();

          return dateA - dateB;
        });
      }
    })
  }

  createReservation(): void {
    if (this.reservationForm.invalid) {

      Object.values(this.reservationForm.controls).forEach(control => {
        control.markAsTouched();
      });
      // Handle form validation errors
      return;
    }

    const newReservation: Reservation = {
      clubID: this.clubData.id,
      reference: this.reservationForm.value.selectedMaterialId,
      onModel: 'Material',
      objet: this.reservationForm.value.objet,
      description: this.reservationForm.value.description,
      etat: 'en cours',
      dateDeb: new Date(this.reservationForm.value.dateDeb),
      dateFin: new Date(this.reservationForm.value.dateFin),
    };

    this.reservationService.createReservation(newReservation).subscribe({
      next: (createdReservation) => {
        this.reservations.push(createdReservation);
        // Reset the form after successful submission
        this.reservationForm.reset();
      },
      error: (error) => {
        console.error('Error creating reservation:', error);
      },
    });
  }
}
// updateReservationEtat(id: string, newEtat: string): void {
//   this.reservationService.updateReservationEtat(id, newEtat).subscribe({
//     next: (updatedReservation) => {
//       const index = this.reservations.findIndex((r) => r._id === updatedReservation._id);
//       if (index !== -1) {
//         this.reservations[index] = updatedReservation;
//       }
//     },
//     error: (error) => {
//       console.error('Error updating reservation etat:', error);
//     },
//   });
// }

// loadReservations(): void {
//   const clubId = this.clubData.id;

//   this.reservationService.getReservationsByClubId(clubId).subscribe({
//     next: (reservations) => {
//       this.reservations = reservations;
//     },
//     error: (error) => {
//       console.error('Error loading reservations:', error);
//     },
//   });
// }