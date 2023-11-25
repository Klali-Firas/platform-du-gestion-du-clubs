import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Chat } from 'src/app/interfaces/ichat';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent {
  chats!: Chat[];
  inp: string = ""
  chat!: Chat;

  constructor(private api: APIService, private datePipe: DatePipe) { }
  ngOnInit(): void {

    this.getAllChats();

  }

  getAllChats() {
    this.api.getAllChats().subscribe({
      next: (res) => {
        res.sort((a, b) => {
          return a.content[a.content.length - 1].timestamp > b.content[b.content.length - 1].timestamp ? -1 : 1; // Sort in descending order (latest first)
        });
        this.chats = res;

        if (!this.chat) {
          this.chat = this.chats[0]
        }
      }
    })
  }

  getChat() {
    this.api.getChat(this.chat.club).subscribe({
      next: (res) => {

        this.chat = res;
      },

    })
  }
  sendMessage(message: string) {
    if (this.inp !== '')
      this.api.addMessage(this.chat.club, message, true).subscribe({
        next: (res) => {
          this.chat = res;
          this.inp = "";
          this.getAllChats();
        }
      })
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'shortTime') + ' | ' + this.datePipe.transform(date, 'MMM d');
  }
  formatDayMonth(date: Date) {
    return this.datePipe.transform(date, 'd MMM');
  }
}
