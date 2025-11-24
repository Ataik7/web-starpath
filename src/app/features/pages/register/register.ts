import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Mantengo tu ruta original, asegúrate de que es correcta:
import { supabase } from '../../../core/services/supabase.config';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  username = ''; 
  email = '';
  password = '';
  
  loading = false;
  errores: string[] = [];

  constructor(private router: Router) {}

  async register() {
    this.errores = [];

    // 1. Validaciones
    if (!this.email || !this.password) {
      this.errores.push('Por favor, rellena todos los campos.');
      return;
    }
    if (this.password.length < 6) {
      this.errores.push('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      this.loading = true;

      // 2. Llamada a Supabase
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          data: {
            username: this.username
          }
        }
      });

      if (error) {
        console.error('Error registro:', error.message);
        if (error.message.includes('User already registered')) {
          this.errores.push('Este correo electrónico ya está registrado.');
        } else {
          this.errores.push(error.message);
        }
      } else {
        // --- 3. EL ARREGLO CLAVE ---
        // Si Supabase devuelve éxito pero la lista de identidades está vacía,
        // significa que el usuario YA existía (falso positivo de seguridad).
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          this.errores.push('Este correo electrónico ya está registrado.');
          this.loading = false;
          return; // Paramos aquí para no mostrar el mensaje de éxito
        }
        // ---------------------------

        alert('¡Registro exitoso! Por favor, revisa tu bandeja de entrada para confirmar tu correo antes de iniciar sesión.');
        this.router.navigate(['/login']);
      }

    } catch (err) {
      this.errores.push('Ocurrió un error inesperado.');
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}