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

  constructor(private router: Router) {}

 async register() {

  if (!this.acceptedTerms) {
    alert('Debes aceptar los términos y condiciones para continuar.');
    return;
  }
  const { user, error } = await signUp(this.email, this.password);

  if (error) {
    alert('Error: ' + error.message);
  } else {
    if (user) {
      // Insertar perfil en la tabla "profiles"
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { id: user.id, email: this.email, username: this.username }
        ]);

      if (profileError) {
        alert('Error al guardar perfil: ' + profileError.message);
      } else {
        alert('Registro exitoso, revisa tu correo para confirmar');
        this.router.navigate(['/login']); // redirige al login
      }
    }
  }
}
}