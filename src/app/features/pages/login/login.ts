import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../../core/services/supabase.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  email = '';
  password = '';
  rememberMe = false;
  loading = false;
  errores: string[] = [];

  // 2. Inyectamos el detector de cambios (cd)
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
      this.email = savedEmail;
      this.rememberMe = true;
    }
  }

  async login() {
    this.errores = [];

    if (!this.email || !this.password) {
      this.errores.push('Por favor, rellena todos los campos.');
      return;
    }

    try {
      this.loading = true;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

      if (error) {
        // Apagamos la carga
        this.loading = false;
        
        console.error('Error de Supabase:', error.message);

        if (error.message.includes('Invalid login credentials')) {
          this.errores.push('El correo o la contraseña son incorrectos.');
        } else if (error.message.includes('Email not confirmed')) {
          this.errores.push('Debes confirmar tu correo electrónico antes de entrar.');
        } else {
          this.errores.push('Error al iniciar sesión: ' + error.message);
        }
        
        // Forzamos a Angular a actualizar la pantalla
        this.cd.detectChanges();
        
        return;
      }

      // Si llegamos aquí, es éxito
      if (this.rememberMe) {
        localStorage.setItem('rememberEmail', this.email);
      } else {
        localStorage.removeItem('rememberEmail');
      }

      window.location.href = '/home';

    } catch (err) {
      this.loading = false;
      this.errores.push('Ocurrió un error inesperado.');
      console.error(err);
      
      this.cd.detectChanges();
    }
  }
}