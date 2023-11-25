import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class LoginStateService {

  private storageSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  get(): string | null {
    return localStorage.getItem('token');
  }
  set(value: string): void {
    localStorage.setItem('token', value);
    this.storageSubject.next(value);
  }
  remove(): void {
    localStorage.removeItem('token');
    this.storageSubject.next(null);
  }

  getStorageObservable(): BehaviorSubject<string | null> {
    return this.storageSubject;
  }
}
