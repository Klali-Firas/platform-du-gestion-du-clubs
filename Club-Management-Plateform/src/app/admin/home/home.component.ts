// home.component.ts

import { Component, OnInit } from '@angular/core';
import { Annonce } from 'src/app/interfaces/iannonce';
import { APIService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/iuser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  annonces!: Annonce[];
  annonceForm = new FormGroup({
    objet: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });


  constructor(private api: APIService,) {

  }

  ngOnInit(): void {
    this.getAnnonces();
  }

  getAnnonces() {
    this.api.getAnnonces().subscribe({
      next: (res) => {
        this.annonces = res;
      }
    });
  }

  createAnnonce() {
    if (this.annonceForm.valid) {
      const { objet, description } = this.annonceForm.value;
      this.api.createAnnonce(objet!, description!).subscribe({
        next: (res) => {
          this.getAnnonces();
          this.annonceForm.reset();
        },
        error: (error) => {
          console.error('Error creating annonce:', error);
        }
      });
    } else {
      // Form is invalid, show an alert or handle as needed
    }
  }

}
