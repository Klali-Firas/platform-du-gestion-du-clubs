import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/iuser';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gestion-clubs',
  templateUrl: './gestion-clubs.component.html',
  styleUrls: ['./gestion-clubs.component.css']
})
export class GestionClubsComponent implements OnInit {
  serverError: boolean = false;
  serverErrorMessage: string = "";
  form: FormGroup;
  addingNewRole: boolean = false;
  user: User = {
    clubName: '',
    clubDescription: '',
    email: '',
    password: '',

  };
  clubs: User[] = [];
  constructor(private api: APIService, private fb: FormBuilder,) {
    this.form = this.fb.group({
      clubName: ['', Validators.required],
      clubDescription: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    });
    this.form.valueChanges.subscribe((value) => {
      this.user = value;
    });
    this.form.controls['email'].valueChanges.subscribe(() => {
      // Reset serverError when email value changes
      this.serverError = false;

    });
  }

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs() {
    this.api.getAllClubs().subscribe({
      next: (res) => {
        this.clubs = res;
      }
    })
  }

  changeClubState(id: string, etat: boolean) {
    this.api.toggleClubActivation(id, etat).subscribe({
      next: (res) => {
        this.getClubs();
      }
    })
  }
  signup() {
    if (this.form.valid && !this.serverError) {
      this.api.signup(this.user).subscribe({
        next: (response) => {
          this.addingNewRole = false;
          this.serverError = false;
          this.getClubs();
          // Optionally, navigate to a different page after successful signup
        },
        error: (error) => {
          console.error('Signup failed:', error);
          // Handle error, show error message, etc.
          if (error && error.error && error.error.message === 'Email is already registered') {
            this.serverError = true;
            this.serverErrorMessage = error.error.message;
            // Handle the specific error message
            console.log('Email is already registered. Please use a different email.');
          } else {
            // Handle other errors or show a generic error message
            console.log('An error occurred during signup. Please try again.');
          }
        },
      });
    }
  }
  togglePopUp() {
    if (this.addingNewRole) {
      document.body.classList.remove('prevent-scroll');
      this.addingNewRole = false
    }
    else {
      document.body.classList.add('prevent-scroll');
      this.addingNewRole = true
    }
  }
}
