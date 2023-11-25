import { Injectable } from '@angular/core';
import { User } from '../interfaces/iuser';


@Injectable({
  providedIn: 'root'
})
export class ClubsServiceService {
  clubs: User[] = [
    // { id: 1, clubName: "Enactus", clubBio: "Enactus ISET Rades", email: "enactusisetrades@gmail.com", members: [], password: "enactus", tel: 25252525, type: accType.club }
  ]

  getClubs() {
    return [...this.clubs];
  }

  // getClubById(id: number) {
  //   return this.clubs.filter((club) => club.id == id);
  // }

  getClubByEmailAndPassword(email: string, pass: string) {
    return this.clubs.filter(club => club.email === email && club.password === pass);
  }

  insertClub(club: User) {
    this.clubs.push(club);
  }

  deleteClubById(id: number) {
    // this.clubs = this.clubs.filter(club => club.id != id);
  }
  constructor() { }
}
