import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SessionService } from '../services/session.service';

/**
 * Ein Guard, welcher entsprechend konfigurierte Routen nur
 * dann aktiviert, wenn ein Login vor liegt.
 * 
 * Die Existenz eines Logins wird durch das vorhandensein 
 * eines Tokens im SessionService definiert.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  /**
    *
    * @param sessionService
    */
  constructor(
    private router: Router,
    private sessionService: SessionService) {
  }

  /**
     * @param next
     * @param state
     * @returns
     */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (!this.sessionService.token) {
      const url = `/login?redirUrl=${state.url}`;
      this.router.navigateByUrl(url);
      return false;
    }
    return true;
  }
}
