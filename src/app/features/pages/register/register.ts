import { Component, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { Router, RouterLink } from '@angular/router'; // 2. Importamos Router para redirección
import { FormsModule } from '@angular/forms'; // 3. Importamos FormsModule para ngModel
import { supabase } from '../../../core/services/supabase.config';

/**
 * Componente de la Página de Registro.
 *
 * Permite a los nuevos usuarios crear una cuenta en la aplicación.
 * Gestiona el formulario de registro (nombre de usuario, email, contraseña),
 * valida los datos y se comunica con Supabase para crear el usuario.
 *
 * También implementa lógica de seguridad para detectar usuarios duplicados
 * y notifica al usuario para que verifique su correo electrónico.
 *
 * @author Iván Gastineau y Pablo Nicolás
 * @version 1.1
 */
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
  successMessage: string | null = null;
  /** Controla si la contraseña es visible */
  showPassword = false;

  /** Alterna la visibilidad de la contraseña */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // 4. Inyectamos el detector de cambios (cd) y el router
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef 
  ) {}

  /**
   * Método principal de registro de usuario.
   *
   * 1. Reinicia errores y realiza validaciones locales (campos vacíos, formato email, longitud password).
   * 2. Llama a Supabase para crear el usuario (signUp).
   * 3. Gestiona errores del servidor (usuario ya existe, email inválido).
   * 4. Implementa una comprobación adicional de seguridad para detectar usuarios duplicados
   * incluso si Supabase devuelve un éxito falso (por seguridad/privacidad).
   * 5. Si es exitoso, muestra un mensaje de éxito en pantalla y redirige al Login.
   */
  async register() {
    this.errores = [];
    this.successMessage = null;

    // Validaciones iniciales
    if (!this.email || !this.password) {
      this.errores.push('Por favor, rellena todos los campos.');
      return;
    }

    // Validar formato email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.errores.push('El formato del correo no es válido.');
      return;
    }

    if (this.password.length < 6) {
      this.errores.push('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      this.loading = true;
      this.cd.detectChanges(); // 5. Forzamos actualización para que salga "REGISTRANDO..."

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
        this.errores.push(error.message);
        this.loading = false;
        this.cd.detectChanges(); // 6. Paramos la carga y actualizamos
        return;
      } 
      
      // Comprobación de usuario duplicado
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        this.errores.push('Este correo electrónico ya está registrado.');
        this.loading = false;
        this.cd.detectChanges(); 
        return;
      }

      // Si todo va bien, mostramos mensaje en pantalla
      this.successMessage = '¡Registro exitoso! Revisa tu bandeja de entrada para confirmar tu correo antes de iniciar sesión.';
      this.cd.detectChanges();

      // Redirigir al login tras 6 segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 6000);

    } catch (err) {
      this.errores.push('Ocurrió un error inesperado.');
      console.error(err);
    } finally {
      this.loading = false;
      this.cd.detectChanges(); // 7. Aseguramos que el botón se desbloquea siempre
    }
  }
}
