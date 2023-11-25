import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces/ichat';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit {

  clubData = JSON.parse(localStorage.getItem('clubData')!);
  chat!: Chat;
  inp: string = ""

  constructor(private api: APIService, private datePipe: DatePipe) { }
  async ngOnInit(): Promise<void> {
    await this.getChat();

  }

  getChat() {
    this.api.getChat(this.clubData.id).subscribe({
      next: (res) => {

        this.chat = res;
      },
      error: () => {
        this.api.createChat(this.clubData.id, this.clubData.clubName).subscribe({
          next: (res) => {
            this.chat = res;
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    })
  }
  sendMessage(message: string) {
    if (this.inp !== '')
      this.api.addMessage(this.clubData.id, message, false).subscribe({
        next: (res) => {
          this.chat = res;
          this.inp = "";
        }
      })
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'shortTime') + ' | ' + this.datePipe.transform(date, 'MMM d');
  }
}
