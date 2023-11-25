import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Annonce } from 'src/app/interfaces/iannonce';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})


export class ClubsComponent implements OnInit {
  annonces!: Annonce[];


  constructor(private api: APIService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAnnonces();
  }

  getAnnonces() {
    this.api.getAnnonces().subscribe({
      next: (res) => {
        this.annonces = res.reverse();
      }
    });
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'shortTime') + ' | ' + this.datePipe.transform(date, 'MMM d');
  }


}
