import { Injectable, OnInit } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRolGuard implements CanActivate, OnInit {

  rol!: string;

  constructor(
    private userService: UserService
  ) { 
    setTimeout(() => {
      this.rol = this.userService.getProfile().rol!;
    }, 150);
  }

  ngOnInit(): void {
    
  }

  canActivate(): boolean  {
    return this.rol === 'admin';
  }
  
}
