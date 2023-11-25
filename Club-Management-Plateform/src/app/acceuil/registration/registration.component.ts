import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/iuser';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {



  private init() {
    this.aRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log(params)
      if (id) {
        console.log(id);
        this.authService.checkIdValidity(id).subscribe({
          next: (response) => {
            console.log('ID and token are valid:', response);
            // Continue with your logic if ID and token are valid
          },
          error: (error) => {
            console.error('ID and token validation failed:', error);
            // Handle the case where ID and token are not valid
          }
        });
      }
    });
  }





  serverError: boolean = false;
  serverErrorMessage: string = "";
  form: FormGroup;
  user: User = {
    clubName: '',
    clubDescription: '',
    email: '',
    password: '',

  };

  constructor(private authService: APIService, private fb: FormBuilder, private aRoute: ActivatedRoute) {
    this.init();
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


  signup() {
    if (this.form.valid && !this.serverError) {
      this.authService.signup(this.user).subscribe({
        next: (response) => {
          this.serverError = false;
          console.log('Signup successful:', response);
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

}
