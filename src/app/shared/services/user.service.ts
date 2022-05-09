import { Injectable } from '@angular/core';
import { user } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private currentUser: user = {};

  updateUser(currentUser: user) {
    this.currentUser = { ...currentUser };
  }

  getUserData(): user {
    return this.currentUser;
  }
}
