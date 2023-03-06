import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UsuarioService } from '../modelos/usuario.service';

interface RouteData {
  expectedRoles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private usuario: UsuarioService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const token = this.authService.getToken();
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      const data = await this.usuario
        .byUsername(user.sub, this.authService.getToken())
        .toPromise();
      console.log('🔥 > AuthGuard > canActivate > data:', data);
      if (data) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
