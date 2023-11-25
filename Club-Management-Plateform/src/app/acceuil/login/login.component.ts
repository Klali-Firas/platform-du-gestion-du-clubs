import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { LoginStateService } from 'src/app/services/login-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; // Declare the form group
  emailError: boolean = false;
  emailErrorMessage: string = '';
  passwordError: boolean = false;
  passwordErrorMessage: string = '';
  constructor(
    private router: Router,
    private loggedInState: LoginStateService,
    private api: APIService,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize the form group with validation rules


    // Check if the user is already logged in
    if (this.loggedInState.get()) {
      this.api.loginWithToken().subscribe({
        next: (res) => {
          console.log(res.valid);
          localStorage.setItem('clubData', JSON.stringify(res.decoded));
          (res.decoded.isAdmin) ?
            this.router.navigate(['admin', res.decoded.id]) :
            this.router.navigate(['clubs', res.decoded.id]);
        }
      });
    }
    this.loginForm.valueChanges.subscribe((value) => {
      this.emailError = false;
      this.passwordError = false;
    });
  }

  login() {
    // Check if the form is valid before making the login request
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.api.signin({ email, password }).subscribe({
        next: (response) => {
          localStorage.setItem('clubID', response.id);
          console.log('Signup successful:', response);
          this.loggedInState.set(response.token);

          this.api.loginWithToken().subscribe({
            next: (res) => {
              localStorage.setItem('clubData', JSON.stringify(res.decoded));
              this.emailError = false;
              this.passwordError = false;
              (res.decoded.isAdmin) ?
                this.router.navigate(['admin', res.decoded.id]) :
                this.router.navigate(['clubs', res.decoded.id]);
            }
          });
        },
        error: (error) => {
          console.error('Signup failed:', error);
          if (error && error.error) {
            if (error.error.message == "Account doesn't exist!") {
              this.emailError = true;
              this.emailErrorMessage = error.error.message;
            }
            else if ((error.error.message == "Invalid password!")) {
              this.passwordError = true;
              this.passwordErrorMessage = error.error.message;
            } else {
              this.emailError = true;
              this.emailErrorMessage = error.error.message;
            }
          }

        },
      });
    }
  }
}
