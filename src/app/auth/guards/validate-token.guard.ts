import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.loginService.validateToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }
  
  canLoad(): Observable<boolean> | boolean {
    return this.loginService.validateToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }
}
