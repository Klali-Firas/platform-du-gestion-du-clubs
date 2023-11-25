import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})


export class ClubsComponent implements OnInit {
  clubs: any[] = []; // Change the type based on your club data structure

  constructor(private apiService: APIService) {

  }

  ngOnInit(): void {
    this.getAllClubs();
  }

  getAllClubs() {
    this.apiService.getAllClubs().subscribe(
      {
        next: (clubs) => {
          this.clubs = clubs;
        },
        error: (error) => {
          console.error('Error fetching clubs:', error);
        }
      });
  }




}
