import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { signUp } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../../core/services/supabase.config';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  username = '';
  email = '';
  password = '';
  acceptedTerms = false;

  errores: string[] = [];

  constructor(private router: Router) {}

  async register() {
    this.errores = [];

    // Validaciones de campos vacíos
    if (!this.username) {
      this.errores.push('Debes introducir un nombre de usuario.');
    }
    if (!this.email) {
      this.errores.push('Debes introducir un correo electrónico.');
    }
    if (!this.password) {
      this.errores.push('Debes introducir una contraseña.');
    }
    if (!this.acceptedTerms) {
      this.errores.push('Debes aceptar los términos y condiciones para continuar.');
    }

    if (this.errores.length > 0) {
      return;
    }

    const { user, error } = await signUp(this.email, this.password);

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('already') || msg.includes('registered') || msg.includes('duplicate')) {
        this.errores.push('El correo electrónico ya está registrado.');
      } else {
        this.errores.push('Error: ' + error.message);
      }
      return;
    }

    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { id: user.id, email: this.email, username: this.username }
        ]);

      if (profileError) {
        const msg = profileError.message.toLowerCase();
        if (msg.includes('duplicate')) {
          this.errores.push('El nombre de usuario ya está en uso.');
        } else {
          this.errores.push('Error al guardar perfil: ' + profileError.message);
        }
      } else {
        // Redirige automáticamente al login tras 2 segundos
        setTimeout(() => this.router.navigate(['/login']), 2000);
      }
    }
  }
}
