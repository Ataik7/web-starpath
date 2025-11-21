import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { supabase } from './supabase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    // Obtenemos el usuario actual desde Supabase
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Usuario logueado → puede entrar al dashboard
      return true;
    } else {
      // No hay usuario → redirigimos al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
