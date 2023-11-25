import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';// Update the import path
import { APIService } from 'src/app/services/api.service';
import { IDemande } from 'src/app/interfaces/idemande';
@Component({
  selector: 'app-demande-formateur',
  templateUrl: './demande-formateur.component.html',
  styleUrls: ['./demande-formateur.component.css']
})
export class DemandeFormateurComponent implements OnInit {
  demandeForm!: FormGroup;
  clubData = JSON.parse(localStorage.getItem("clubData")!!);
  constructor(
    private formBuilder: FormBuilder,
    private api: APIService // Update the service injection
  ) { }

  ngOnInit(): void {
    this.demandeForm = this.formBuilder.group({
      objet: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.demandeForm.valid) {

      const demandeData: IDemande = {
        clubID: this.clubData.id,
        objet: this.demandeForm.get('objet')?.value,
        description: this.demandeForm.get('description')?.value,

      }

      this.api.createDemande(demandeData).subscribe(
        {
          next: (createdDemande) => {
            // Handle success, you can redirect or show a success message
            console.log('Demande created successfully:', createdDemande);
            this.demandeForm.reset();
          },
          error: (error) => {
            // Handle error, show an error message or log it
            console.error('Error creating demande:', error);
          }
        });
    } else {
      this.demandeForm.markAllAsTouched()
    }
  }
}
