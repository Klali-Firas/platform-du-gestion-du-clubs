import { Injectable } from '@angular/core';
import { Imember } from '../interfaces/imember';

@Injectable({
  providedIn: 'root'
})
export class MembersServiceService {
  members: Imember[] = [
    {
      firstName: "firas",
      lastName: "klali",
      birthday: "02 february 2001",
      clubs: [1, 2],
      email: "firasklali1234@gmail.com",
      tel: 54218262
    },
    {
      firstName: "John",
      lastName: "Doe",
      birthday: "15 March 1995",
      clubs: [3, 4],
      email: "johndoe@gmail.com",
      tel: 12345678
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      birthday: "10 July 1990",
      clubs: [2, 5],
      email: "alice.johnson@example.com",
      tel: 98765432
    },
    {
      firstName: "Bob",
      lastName: "Smith",
      birthday: "30 September 1987",
      clubs: [1, 3],
      email: "bob.smith@mail.com",
      tel: 56781234
    },
    {
      firstName: "Eva",
      lastName: "Williams",
      birthday: "05 November 1993",
      clubs: [4, 5],
      email: "eva.williams@example.org",
      tel: 74185296
    }
  ]

  getMembers() {
    return [...this.members]
  }
  getMemberByEmail(email: string) {
    return this.members.filter(member => member.email === email);
  }

  getMemebersByClubId(clubId: number) {
    return this.members.filter(member => member.clubs.includes(clubId))
  }

  addMember(member: Imember) {
    var m = this.members.find(m => m.email = member.email);
    if (m) {
      this.members[this.members.indexOf(m)].clubs.push(member.clubs[0]);
    } else {
      this.members.push(member);
    }
  }

  deleteMember(email: string) {
    this.members.filter(member => member.email != email)
  }


  constructor() { }
}
