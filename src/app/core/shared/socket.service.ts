import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private userInfo: any;

  constructor() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (this.userInfo) {
      this.connect();
    }
  }

  private connect(): void {
    const token = localStorage.getItem('token');
    //const url = `${environment.ws_url}?token=${token}`;
    //this.socket = io(url);

    // Handle connection events (optional)
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Handle general user-related events
    this.handleUserEvents();
  }

  private handleUserEvents(): void {
    if (this.socket) {
      // Listen for user login/logout events
      this.socket.on(`user-login-logout`, (data) => {
        console.log('User login/logout event:', data);
      });

      // Listen for user data updates
      this.socket.on(`user-data-update`, (data) => {
        console.log('User data update event:', data);
      });
    } else {
      console.error('Socket is not connected.');
    }
  }

  // Emit user login/logout events
  emitLoginLogout(userEvent: any): void {
    if (this.socket) {
      this.socket.emit(`get-latest-login-logout`, userEvent);
    } else {
      console.error('Socket is not connected.');
    }
  }

  // Emit user data update events
  emitUserDataUpdate(userData: any): void {
    if (this.socket) {
      this.socket.emit(`update-user-data`, userData);
    } else {
      console.error('Socket is not connected.');
    }
  }
}
