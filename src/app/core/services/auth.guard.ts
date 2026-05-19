import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { supabase } from './supabase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
