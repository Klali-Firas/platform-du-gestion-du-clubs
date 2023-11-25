import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/iuser';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gestion-clubs',
  templateUrl: './gestion-clubs.component.html',
  styleUrls: ['./gestion-clubs.component.css']
})
export class GestionClubsComponent implements OnInit {

  clubs: User[] = [];
  constructor(private api: APIService) { }

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
}
