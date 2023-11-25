import { Component, OnInit, SimpleChanges } from '@angular/core';
import { LoginStateService } from './services/login-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private localStorageService: LoginStateService) { }
  islogedin: boolean = false;

  clubData = JSON.parse(localStorage.getItem('clubData')!);
  isAdmin = false;

  ngOnInit() {

    if (this.clubData) {
      this.isAdmin = this.clubData.isAdmin ?? false;
    }
    this.localStorageService.getStorageObservable().subscribe((value) => {
      this.islogedin = !!value;

    });



  }


  title = 'university-club-management';
}
