import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 
import { signIn } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'      
})
export class Login {
  email = '';
  password = '';

  errores: string[] = [];
  successMessage: string | null = null; 

  constructor(private router: Router) {}

  async login() {
    this.errores = []; 
    this.successMessage = null; 

    // Validaciones de campos vacíos 
    if (!this.email) {
      this.errores.push('Debes introducir tu correo electrónico.');
    }

    if (!this.password) {
      this.errores.push('Debes introducir tu contraseña.');
    }

    if (this.errores.length > 0) {
      return;
    }

    const { data, error } = await signIn(this.email, this.password);

    if (error) {
      this.errores.push('Error: ' + error.message);
    } else {
      this.successMessage = 'Inicio de sesión exitoso 🎉';
      setTimeout(() => this.router.navigate(['/dashboard']), 2000);
    }
  }
}
