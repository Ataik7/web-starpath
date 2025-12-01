import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../../core/services/supabase.config';

/**
 * Componente de la Página de Inicio de Sesión (Login).
 *
 * Permite a los usuarios autenticarse en la aplicación utilizando sus credenciales
 * (correo electrónico y contraseña). Gestiona la comunicación con Supabase para
 * validar la sesión y redirige al usuario a la página principal en caso de éxito.
 *
 * También incluye la funcionalidad de "Recuérdame" para guardar el correo
 * electrónico en el almacenamiento local del navegador.
 *
 * @author Iván Gastineau y Pablo Nicolás
 * @version 1.0
 */
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

  
  /**
   * Método del ciclo de vida de Angular.
   * Se ejecuta al iniciar el componente.
   *
   * Comprueba si hay un correo electrónico guardado en localStorage
   * (funcionalidad "Recuérdame") y, si existe, rellena el campo y marca el checkbox.
   */
  ngOnInit() {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
      this.email = savedEmail;
      this.rememberMe = true;
    }
  }

   /**
   * Método principal de inicio de sesión.
   *
   * 1. Reinicia el estado de errores.
   * 2. Valida que los campos obligatorios no estén vacíos.
   * 3. Realiza la llamada asíncrona a Supabase para iniciar sesión.
   * 4. Gestiona los errores devueltos por Supabase.
   * 5. Si es exitoso:
   * - Guarda o borra el email en localStorage según el checkbox "Recuérdame".
   * - Redirige al usuario a la página de inicio.
   */
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